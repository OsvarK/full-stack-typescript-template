import { Schema, model } from "mongoose";

export enum AccountType {
    Email,
    Google,
    Facebook
}

/** Defines the account, if its a google, facebook or a normal account */
const accountSchema : Schema = new Schema({
    accountType: {
        type: AccountType,
        required: true
    },
    accountData: {
        type: Schema.Types.ObjectId || String,
        required: true
    }
});


export default model('Account', accountSchema);