import "./../authentication.css";
import React, { FC, useState } from "react";
import { useAuth } from "../../../contexts/authentication.context";
import CreatePassword from "./createPassword.cmpt";
import PasswordInput from "./passwordInput.cmpt";

const ProfilePasswordPanel: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState<string | null>(null);

    const [input, SetInput] = useState({
        newPassword: "",
        newRePassword: "",
        currentPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.newPassword !== input.newRePassword) {
            SetAlert("Passwords don't match");
            return;
        }

        console.log("Not implemented, change user info");
        console.log(input);
    };

    return (
        <div className="auth-container">
        <h1>Update Password</h1>
        <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
        {alert !== null ? <p className="auth-alert">{alert}</p> : null }
        <form autoComplete="off" onSubmit={handleSubmit}>
            <CreatePassword
                passwordName="newPassword"
                passwordPlaceholder="New password.."
                confirmePasswordName="newRePassword"
                confirmePasswordPlaceholder="Confirme new password.."
                onChange={handleChange}
            />
            <p className="auth-input-label">Your current password</p>
            <PasswordInput
                name="currentPassword"
                autoComplete="off"
                placeholder="Current password.."
                onChange={handleChange}
            />
            <button className="auth-btn auth-btn-main" >Update account information</button>
        </form>
    </div>
    );
};

export default ProfilePasswordPanel;