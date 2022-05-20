import "./../authentication.css";
import { FC, useState } from "react";
import { useAuth } from "../../../contexts/authentication.context";
import PasswordInput from "./passwordInput.cmpt";
import Alert, { IAlert } from "./alert.cmpt";

const ProfileSettingsPanel: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState<IAlert>({
        show: false,
        ok: false,
        msg: ''
    });

    const [input, SetInput] = useState({
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    };

    const handleLogout = () => {
        auth.logout((res: Response) => {
            if (res.ok) return window.location.href='/';
            res.json().then(msg => {
                SetAlert({
                    show: true,
                    ok: false,
                    msg: msg
                });
            });
        });
    };

    const handleDeleteAccount = () => {
        if (input.password.length < 1) {
            SetAlert({
                show: true,
                ok: false,
                msg: "Provide your password to delete this account"
            });
            return;
        }
        auth.deleteAccount(input.password,  (res: Response) => {
            if (res.ok) return window.location.href='/';
            res.json().then(msg => {
                SetAlert({
                    show: true,
                    ok: false,
                    msg: msg
                });
            });
        });
    };

    return (
        <div className="auth-container">
        <h1>Settings</h1>
        <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
        <Alert show={alert.show} ok={alert.ok} msg={alert.msg} />
        <div>
            <button onClick={handleLogout} className="auth-btn auth-btn-main">Logout</button>
            <button onClick={handleDeleteAccount} className="auth-btn auth-btn-main">Delete Account</button>
            <PasswordInput name="password" autoComplete="off" placeholder="Password.." onChange={handleChange} />
        </div>
    </div>
    );
};

export default ProfileSettingsPanel;