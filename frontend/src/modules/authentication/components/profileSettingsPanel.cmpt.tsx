import "./../authentication.css";
import { FC, useState } from "react";
import { useAuth } from "../../../contexts/authentication.context";

const ProfileSettingsPanel: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState<string | null>(null);

    const handleLogout = () => {
        auth.logout((res: Response) => {
            if (res.ok) return window.location.href='/';
            res.json().then(msg => {
                SetAlert(msg);
            });
        });
    };

    return (
        <div className="auth-container">
        <h1>Settings</h1>
        <p className="auth-tooltop">{auth.getUserData().firstName} {auth.getUserData().lastName}</p>
        {alert !== null ? <p className="auth-alert">{alert}</p> : null }
        <div>
            <button onClick={handleLogout} className="auth-btn auth-btn-main">Logout</button>
        </div>
    </div>
    );
};

export default ProfileSettingsPanel;