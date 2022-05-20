import "./../authentication.css";
import React, { FC, useState } from "react";
import PasswordInput from "./passwordInput.cmpt";
import { useAuth } from "../../../contexts/authentication.context";

const ProfileDataPanel: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState<string | null>(null);

    const [input, SetInput] = useState({
        firstName: auth.getUserData().firstName,
        lastName: auth.getUserData().lastName,
        email: auth.getUserData().email,
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

        if (
            input.firstName === auth.getUserData().firstName &&
            input.lastName === auth.getUserData().lastName &&
            input.email === auth.getUserData().email
        ) return;

        console.log("Not implemented, change user info");
        console.log(input);
    };

    return (
        <div className="auth-container">
        <h1>Account Data</h1>
        <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
        {alert !== null ? <p className="auth-alert">{alert}</p> : null }
        <form autoComplete="off" onSubmit={handleSubmit}>
            <p className="auth-input-label">First name</p>
            <input
                value={input.firstName}
                className="auth-input"
                onChange={handleChange}
                name="firstName"
                required
                placeholder="First name.."
            />
            <p className="auth-input-label">Last name</p>
            <input
                value={input.lastName}
                className="auth-input"
                onChange={handleChange}
                name="lastName"
                required
                placeholder="Last name.."
            />
            <p className="auth-input-label">Email</p>
            <input
                disabled={auth.getUserData().accountType !== "Normal"}
                value={input.email}
                className="auth-input"
                onChange={handleChange}
                name="email"
                required
                placeholder="Email.."
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

export default ProfileDataPanel;