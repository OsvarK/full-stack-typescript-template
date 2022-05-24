import { Schema, model } from "mongoose";

/** Defines what type of account there is */
export enum AccountType {
    Normal = "Normal",
    Google = "Google"
}

/** Interface for the account schema */
export interface IAccount {
    _id?: String,
    createdAt?: Date,
    accountType: AccountType;
    firstName: String;
    lastName: String;
    email: String;
    emailVerified: Boolean;
    hashedPassword?: String;
    isAdmin: Boolean;
}

/** Defines the account model */
const accountSchema : Schema = new Schema({
    accountType: {
        type: String,
        enum: Object.values(AccountType),
        default: AccountType.Normal,
        required: true
    },
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: false
    },
    emailVerified: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export default model<IAccount>('Account', accountSchema);