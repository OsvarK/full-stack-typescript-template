import { Request, Response } from "express"
import { CallbackError, Model, Schema } from "mongoose";
import { hash } from "../../utils/Hash.util";
import { validatePassword } from "../../utils/validation.utils";
import envConfig from "../../configs/env.config";
import accountModel, { IAccount, INnormalAccountData, normalAccountData  AccountType } from "./models/account.model";


/** Create a new account as a normal email user */
const createAccount = (req: Request, res: Response) => {

    //const errorStr =
    //    'A user requires a firstName (3-25 chars), ' +
    //    'lastName (3-25 chars), email (3-50 chars) ' +
    //    'and a password. ' +
    //    'The Password has to have a minimum of eight characters, ' +
    //    'at least one uppercase letter, one lowercase letter, ' +
    //    'one number and one special character!';
//
    //if (!validatePassword(req.body.password)) return res.status(422).json({error: errorStr});
//
    //const hashedPassword = hash(req.body.password, envConfig.secrets.passwordHash);
//
    //const accountData : INnormalAccountData = new normalAccountData({
    //    firstName: req.body.firstName,
    //    lastName: req.body.lastName,
    //    email: req.body.email,
    //    hashedPassword: hashedPassword
    //});
//
    //const account : IAccount = new accountModel({
    //    accountType: AccountType.Normal,
    //    accountData: accountData,
    //    isAdmin: false
    //});
//
//
    //res.sendStatus(200);
};


/** Retrives all the users in the database */
const getAllAccounts = (req: Request, res: Response) => {
    accountModel.find((error: CallbackError, accounts: IAccount[]) => {
        if (error) return res.sendStatus(500);
        return res.status(200).json(accounts);
    });
};


const controller = {
    createAccount,
    getAllAccounts
};

export default controller;