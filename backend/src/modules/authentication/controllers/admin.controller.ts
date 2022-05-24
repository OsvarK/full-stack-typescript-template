import accountModel, { IAccount } from "../models/account.model";
import { CallbackError } from "mongoose";
import { Request, Response } from "express"

/** Retrives all the users in the database */
const getAllAccounts = async (_req: Request, res: Response) => {
    accountModel.find((err: CallbackError, accounts: IAccount[]) => {
        if (err) return res.sendStatus(500);
        accounts.map((account) => account.hashedPassword = undefined);
        return res.status(200).json(accounts);
    });
};

/** Exports all the admin controllers */
export const controller = {
    getAllAccounts,
}

export default controller;