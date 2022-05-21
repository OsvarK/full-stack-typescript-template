import e, { Request, Response } from "express"
import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { CallbackError } from "mongoose";
import { hash } from "../../utils/Hash.util";
import { validatePassword } from "../../utils/validation.utils";
import envConfig from "../../configs/env.config";
import accountModel, { IAccount, AccountType } from "./account.model";
import { sendEmail } from "../../utils/email.util";


/** Login the user using Google Identity Services */
const loginGoogle = async (req: Request, res: Response) => {
    const token = req.body.googleToken;
    const clientId = envConfig.secrets.googleClientId;
    const client = new OAuth2Client(clientId);

    client.verifyIdToken({
        idToken: token,
        audience: clientId
    })
    .then(async (data) => {
        const payload = data.getPayload();

        if (payload?.given_name === undefined ||
            payload?.family_name === undefined ||
            payload?.email === undefined ||
            payload?.email_verified === undefined
        ) { return res.status(422).json("Invalid payload data"); }

        const query = {email: payload?.email};
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const update = {
            accountType: AccountType.Google,
            firstName: formateNames(payload.given_name),
            lastName: formateNames(payload.family_name),
            email: payload.email.toLowerCase(),
            emailVerified: payload.email_verified,
            isAdmin: false
        };

        let createdAccount: any = await accountModel.findOneAndUpdate(query, update, options);
        if (createdAccount === null) return res.status(500).json("Unable to create/update an account from google data");
        setAccountLoggedIn(res, createdAccount._id);
        res.sendStatus(200);
    })
    .catch(() => { return res.status(401).json("Invalid token signature"); });
}


/** Login user using normal password and email */
const loginUser = async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = hash(req.body.password, envConfig.secrets.passwordHash);
    const account = await accountModel.findOne({email: email, hashedPassword: password});

    if (account !== null) {
        setAccountLoggedIn(res, (account._id as string));
        return res.sendStatus(200);
    }

    return res.status(401).json('Credentials is not valid!');
}


/** Create a new account as a normal email user */
const createAccount = async (req: Request, res: Response) => {

    if (!validatePassword(req.body.password)) return res.status(422).json("Password does not meet the password requirements");
    const hashedPassword = hash(req.body.password, envConfig.secrets.passwordHash);

    const account : IAccount = {
        accountType: AccountType.Normal,
        firstName: formateNames(req.body.firstName),
        lastName: formateNames(req.body.lastName),
        email: req.body.email.toLowerCase(),
        emailVerified: false,
        hashedPassword: hashedPassword,
        isAdmin: false
    };

    const model = new accountModel(account);

    model.save((err: any, doc: IAccount) => {
        if (err !== null) {
            if (err.code === 11000) return res.status(422).json('Email already exist');
            else return res.status(422).json(`Error creating account: ${err.code}`);
        }

        setAccountLoggedIn(res, (doc._id as string));
        res.sendStatus(201);
        sendVerifyEmail(req.body.email);
    });
};


/** Update account information */
const updateAccountInfo = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        const account = await accountModel.findById(decoded._id);
        if (account !== null) {
            try {
                const update = {
                    firstName: formateNames(req.body.firstName),
                    lastName: formateNames(req.body.lastName)
                };
                accountModel.findByIdAndUpdate(account._id, update, (err: any) => {
                    if (err !== null) return res.status(422).json(`Error updating account: (Mongoose err: ${err.code}):`);
                    return res.status(200).json('Account has been updated!');
                });
            } catch (ex) { return res.sendStatus(400); }
        } else return res.status(401).json('Account does not exist');
    } catch (ex) { return res.sendStatus(400); }
};


/** Update email */
const updateEmail = async (req: Request, res: Response) => {

    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        const account = await accountModel.findById(decoded._id);
        if (account !== null) {

            const password = hash(req.body.password, envConfig.secrets.passwordHash);
            const email = req.body.newEmail.toLowerCase();
            if (password !== account.hashedPassword){
                return res.status(401).json("Credentials is not valid!");
            }

            if (account.email === email) {
                return res.status(401).json("This is already your email!");
            }

            try {
                const update = {
                    email: email,
                    emailVerified: false,
                };
                accountModel.findByIdAndUpdate(account._id, update, (err: any) => {
                    if (err !== null) {
                        if (err.code === 11000) return res.status(422).json('Email already exist');
                        else return res.status(422).json(`Error creating account: ${err.code}`);
                    }
                    sendVerifyEmail(req.body.newEmail);
                    return res.status(200).json('Email has been updated!');
                });
            } catch (ex) { return res.sendStatus(400); }
        } else return res.status(401).json('Account does not exist');
    } catch (ex) { return res.sendStatus(400); }
}


/** Change password */
const updatePassword = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        const account = await accountModel.findById(decoded._id);

        if (!validatePassword(req.body.newPassword)){
            return res.status(422).json("Password does not meet the password requirements");
        }

        const newPassword = hash(req.body.newPassword, envConfig.secrets.passwordHash);
        const currentPassword = hash(req.body.currentPassword, envConfig.secrets.passwordHash);

        if (account !== null) {
            if (account.accountType !== AccountType.Normal){
                return res.status(401).json("Third party account's does not have a password");
            }

            if (currentPassword !== account.hashedPassword){
                return res.status(401).json("Credentials is not valid!");
            }

            if (newPassword === account.hashedPassword){
                return res.status(401).json("You already have this password");
            }

            try {
                const update = { hashedPassword:  newPassword};
                accountModel.findByIdAndUpdate(account._id, update, (err: any) => {
                    if (err !== null) return res.status(422).json(`Error updating account: (Mongoose err: ${err.code}):`);
                    return res.status(200).json('Password has been updated!');
                });
            } catch (ex) { return res.sendStatus(400); }
        } else return res.status(404).json('Account does not exist');
    } catch (ex) { return res.sendStatus(400); }
};


/** Delete account by id */
const deleteAccount = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        const account = await accountModel.findByIdAndDelete(decoded._id);
        if (account !== null) return res.sendStatus(200);
        return res.status(401).json('Account does not exist');
    } catch (ex) { return res.sendStatus(400); }
};


/** Logout the user */
const logoutUser = async (req: Request, res: Response) => {
    terminateAccountSession(res);
    return res.sendStatus(200);
};


/** Retrives all the users in the database */
const getAllAccounts = async (req: Request, res: Response) => {
    accountModel.find((err: CallbackError, accounts: IAccount[]) => {
        if (err) return res.sendStatus(500);
        return res.status(200).json(accounts);
    });
};


/** Verifies the token and return the user data */
const verifyUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        accountModel.findById(decoded._id, (err: CallbackError, user: IAccount) => {
            if (err) return res.status(422).json('The ID may not be valid!');
            return res.status(200).json(user)
        });
    } catch (ex) { res.sendStatus(400); }
}

/** Verify email */
const verifyEmail = async (req: Request, res: Response) => {
    const token = req.params.jwt;
    try {
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        accountModel.findOneAndUpdate({email: decoded.email}, {
            emailVerified: true
        }, (err: CallbackError) => {
            if (err) return res.sendStatus(422);
            return res.sendStatus(200);
        });
    } catch { return res.sendStatus(422) }
}


/** Send email that user can click on to verify there email with */
const sendVerifyEmail = (email: string) => {
    const token = jwt.sign(
        {email: email},
        envConfig.secrets.jwt,
        {expiresIn: '600s'}
    );

    sendEmail(email, 'Email verification', `Click this link to verify your email: ${envConfig.url + '/api/auth/verifyemail/'}` + token.toString())
}


/** Set the cookie that defines the user's authentication */
const setAccountLoggedIn = (res: Response, accountId: String) => {
    //Expires in 24H: 86400sec

    const token = jwt.sign(
        {_id: accountId},
        envConfig.secrets.jwt,
        {expiresIn: '86400s'}
    );

    res.cookie(envConfig.names.authCookie, token, {
        httpOnly: true,
        maxAge: 86_400_000
    });
}

/** Terminates the cookie that holds the user's authentication */
const terminateAccountSession = (res: Response) => {
    res.clearCookie(envConfig.names.authCookie);
}

/** Format the names */
const formateNames = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}


/** Exports all the admin controllers */
export const adminController = {
    getAllAccounts,
}

/** Exports all the default controllers */
const controller = {
    deleteAccount,
    updatePassword,
    createAccount,
    loginGoogle,
    logoutUser,
    loginUser,
    verifyUser,
    updateEmail,
    verifyEmail,
    updateAccountInfo
};

export default controller;