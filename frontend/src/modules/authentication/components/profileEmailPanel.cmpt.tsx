import "./../authentication.css";
import React, { FC, useState } from "react";
import { useAuth } from "../../../contexts/authentication.context";
import PasswordInput from "./passwordInput.cmpt";
import Alert, { IAlert } from "./alert.cmpt";

const ProfileEmailPanel: FC = () => {

    const auth = useAuth();

    const [alert, SetAlert] = useState<IAlert>({
        show: false,
        ok: false,
        msg: ''
    });

    const [input, SetInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    if (auth.getUserData().accountType !== "Normal") {
        return (
            <div className="auth-container">
                <h1>{auth.getUserData().accountType}</h1>
                <p className="auth-tooltop">is taking care of your email</p>
            </div>
        );
    };

    return (
        <div className="auth-container">
        <h1>Update Email</h1>
        <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
        <Alert show={alert.show} ok={alert.ok} msg={alert.msg} />
        <form autoComplete="off" onSubmit={handleSubmit}>
            <p className="auth-input-label">{auth.getUserData().email}</p>
            <input
                value={input.email}
                className="auth-input"
                onChange={handleChange}
                type="email"
                name="email"
                required
                placeholder="New Email.."
            />
            <p className="auth-input-label">Confirme using your password</p>
            <PasswordInput
                name="password"
                autoComplete="off"
                placeholder="Password.."
                onChange={handleChange}
            />
            <button className="auth-btn auth-btn-main" >Update Email</button>
        </form>
    </div>
    );
};

export default ProfileEmailPanel;