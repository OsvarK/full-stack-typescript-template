import { Schema, model, Document } from "mongoose";

/** Defines what type of account there is */
export enum AccountType {
    Normal = "Normal",
    Google = "Google",
    Facebook = "Facebook"
}

/** Interface for the account schema */
export interface IAccount {
    accountType: AccountType;
    accountData: INnormalAccountData | IThirdPartyAccountData;
    isAdmin: Boolean;
}

/** Interface for the normalAccountData schema */
export interface INnormalAccountData {
    firstName: String;
    lastName: String;
    email: String;
    hashedPassword: String;
}

/** Interface for the thirdPartyAccountData schema */
export interface IThirdPartyAccountData {
    thirdPartyId: String;
}

/** Defines the account, if its a google, facebook or a normal account */
const accountSchema : Schema = new Schema({
    accountType: {
        type: String,
        enum: Object.values(AccountType),
        default: AccountType.Normal,
        required: true
    },
    accountData: {
        type: [
            {
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
                    required: true
                }
            }
            ||
            {
                thirdPartyId: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export default model<IAccount>('Account', accountSchema);