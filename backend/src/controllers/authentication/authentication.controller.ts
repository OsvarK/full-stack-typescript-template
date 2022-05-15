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
            firstName: payload.given_name,
            lastName: payload.family_name,
            email: payload.email,
            emailVerified: payload.email_verified
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

    return res.status(401).json({error: 'Credentials is not valid!'});
}


/** Create a new account as a normal email user */
const createAccount = async (req: Request, res: Response) => {

    const errorStr =
        'A user requires a firstName (3-25 chars), ' +
        'lastName (3-25 chars), email (3-50 chars) ' +
        'and a password. ' +
        'The Password has to have a minimum of eight characters, ' +
        'at least one uppercase letter, one lowercase letter, ' +
        'one number and one special character!'
    ;

    if (!validatePassword(req.body.password)) return res.status(422).json(errorStr);
    const hashedPassword = hash(req.body.password, envConfig.secrets.passwordHash);

    const account : IAccount = {
        accountType: AccountType.Normal,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emailVerified: false,
        hashedPassword: hashedPassword,
        isAdmin: false
    };

    const model = new accountModel(account);

    model.save((err: any, doc: IAccount) => {
        if (err !== null) {
            console.log(err)
            if (err.code === 11000) return res.status(422).json('Email already exist');
            res.status(422).json(`Error creating account: (Mongoose err: ${err.code}):`);
        }

        setAccountLoggedIn(res, (doc._id as string));
        res.sendStatus(201);
    });

    sendVerifyEmail(req.body.email);
};


/** Delete account by id */
const deleteAccount = async (req: Request, res: Response) => {
    await accountModel.findByIdAndDelete(req.params.id)
    return res.sendStatus(200);
}


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
    const token = req.cookies[envConfig.names.authCookie];
    try {
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        accountModel.findById(decoded._id, (err: CallbackError, user: IAccount) => {
            if (err) return res.status(422).json({error: 'The ID may not be valid!'});
            return res.status(200).json(user)
        });
    } catch (ex) { res.sendStatus(400) }
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


/** Exports all the admin controllers */
export const adminController = {
    getAllAccounts,
    deleteAccount
}

/** Exports all the default controllers */
const controller = {
    createAccount,
    loginGoogle,
    logoutUser,
    loginUser,
    verifyUser,
    verifyEmail
};

export default controller;