import "./../authentication.css";
import React, { FC, useState } from "react";
import { useAuth } from "../../../contexts/authentication.context";
import CreatePassword from "./createPassword.cmpt";
import PasswordInput from "./passwordInput.cmpt";
import Alert, { IAlert } from "./alert.cmpt";

const ProfilePasswordPanel: FC = () => {

    const auth = useAuth();

    const [alert, SetAlert] = useState<IAlert>({
        show: false,
        ok: false,
        msg: ''
    });

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
            SetAlert({
                show: true,
                ok: false,
                msg: "Passwords don't match"
            });
            return;
        };

        auth.updatePassword(
            input.newPassword,
            input.currentPassword,
            (res: Response) => {
                res.json().then(msg => {
                    SetAlert({
                        show: true,
                        ok: res.ok,
                        msg: msg
                    });
                });
            },
        );
    };


    if (auth.getUserData().accountType !== "Normal") {
        return (
            <div className="auth-container">
                <h1>{auth.getUserData().accountType}</h1>
                <p className="auth-tooltop">accounts does not have a password</p>
            </div>
        );
    };


    return (
        <div className="auth-container">
            <h1>Update Password</h1>
            <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
            <Alert show={alert.show} ok={alert.ok} msg={alert.msg} />
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