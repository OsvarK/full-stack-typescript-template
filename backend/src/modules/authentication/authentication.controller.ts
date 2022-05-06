import { Request, Response } from "express"
import { CallbackError, Model, Schema } from "mongoose";
import { hash } from "../../utils/Hash.util";
import { validatePassword } from "../../utils/validation.utils";
import envConfig from "../../configs/env.config";


/** Create a new account as a normal email user */
const createAccount = (req: Request, res: Response) => {

    const errorStr =
        'A user requires a firstName (3-25 chars), ' +
        'lastName (3-25 chars), email (3-50 chars) ' +
        'and a password. ' +
        'The Password has to have a minimum of eight characters, ' +
        'at least one uppercase letter, one lowercase letter, ' +
        'one number and one special character!';

    if (!validatePassword(req.body.password)) return res.status(422).json({error: errorStr});

    const hashedPassword = hash(req.body.password, envConfig.secrets.passwordHash);


    res.sendStatus(200);
};


const controller = {
    createAccount
};

export default controller;