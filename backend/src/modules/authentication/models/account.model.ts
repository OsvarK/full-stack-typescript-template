import { Schema, model, Document } from "mongoose";

/** Defines what type of account there is */
export enum AccountType {
    Normal,
    Google,
    Facebook
}

/** Interface for the account schema */
export interface IAccount extends Document {
    accountType: AccountType;
    accountData: Schema.Types.ObjectId | String;
    isAdmin: Boolean;
}

/** Interface for the normalAccountData schema */
export interface INnormalAccountData extends Document {
    firstName: String;
    lastName: String;
    email: String;
    hashedPassword: String;
}

/** Interface for the thirdPartyAccountData schema */
export interface IThirdPartyAccountData extends Document {
    thirdPartyId: String;
}

/** Third Party Account data (Reference to an id) */
export const thirdPartyAccountData : Schema = new Schema({
    thirdPartyId: {
        type: String,
        required: true
    }
});


/** Defines the account data for normal users */
export const normalAccountData : Schema = new Schema({
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
}, { _id: false });


/** Defines the account, if its a google, facebook or a normal account */
const accountSchema : Schema = new Schema({
    accountType: {
        type: AccountType,
        required: true
    },
    accountData: {
        type: [normalAccountData || thirdPartyAccountData],
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });


export default model<IAccount>('Account', accountSchema);