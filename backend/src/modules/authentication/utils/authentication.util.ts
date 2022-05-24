import { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import envConfig from "../../../configs/env.config";
import { sendEmail } from "./email.util";

/** Send email that user can click on to verify there email with */
export const sendVerifyEmail = (email: string) => {
    const token = jwt.sign(
        {email: email},
        envConfig.secrets.jwt,
        {expiresIn: '600s'}
    );

    sendEmail(email, 'Email verification', `Click this link to verify your email: ${envConfig.url + '/api/auth/verifyemail/'}` + token.toString())
}

/** Retrives the user id from token */
export const getUserIdFromToken = (req: Request) => {
    try {
        const token = req.cookies[envConfig.names.authCookie];
        const decoded = jwt.verify(token, envConfig.secrets.jwt) as JwtPayload;
        return decoded._id;
    } catch (ex) { return null }
}


/** Set the cookie that defines the user's authentication */
export const setAccountLoggedIn = (res: Response, accountId: String) => {
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
export const terminateAccountSession = (res: Response) => {
    res.clearCookie(envConfig.names.authCookie);
}

/** Format the names */
export const formateNames = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}