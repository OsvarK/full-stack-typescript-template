import { Request, Response, NextFunction } from "express";
import { CallbackError } from "mongoose";
import accountModel, { IAccount } from "../models/account.model";
import { getUserIdFromToken } from "../utils/authentication.util";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = getUserIdFromToken(req);
        if (id !== null) {
            accountModel.findById(id, (err: CallbackError, user: IAccount) => {
                if (err) return res.status(422).json('The ID may not be valid!');
                if (user.isAdmin) return next();
                return res.sendStatus(401);
            });
        } else return res.sendStatus(401);
    } catch { return res.sendStatus(401) };
}

export default isAdmin;