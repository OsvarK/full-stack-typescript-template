import { Schema, model } from "mongoose";

/** Defines the account data for normal users */
const accountData : Schema = new Schema({
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
    },
    emailVerifed: {
        type: Boolean,
        required: true
    }
});


export default model('AccountData', accountData);