import { Request, Response } from "express"
import { Schema } from "mongoose";
import { hash } from "../../utils/Hash.util";
import envConfig from "../../configs/env.config";

import accountModel, { AccountType } from "./models/account.model";
import accountData from "./models/accountData";


/** Create a new account as a normal email user */
const createAccount = (req: Request, res: Response) => {

    //const hashedPassword = hash(req.body.password, envConfig.secrets.passwordHash);
//
    //const data : Schema = new accountData({
    //    firstName: req.body.firstName,
    //    lastName: req.body.lastName,
    //    email: req.body.email,
    //    hashedPassword: req.body.password
    //});
//
    //const account : Schema = new accountModel({
    //    accountType: AccountType.Email,
    //    accountData: data
    //});

    res.sendStatus(200);
}


const controller = {
    createAccount
}

export default controller;