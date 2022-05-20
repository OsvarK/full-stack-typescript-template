import "./authentication.css";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "./components/thirdPartyLogin.cmpt";
import React, { FC, useState } from "react";
import PasswordInput from "./components/passwordInput.cmpt";
import { useAuth } from "../../contexts/authentication.context";

const LoginPage: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState(null);
    const [input, SetInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        auth.login(
            input.email,
            input.password,
            (res: Response) => {
                if (res.ok) return window.location.href='/p';
                res.json().then(msg => {
                    SetAlert(msg);
                });
            }
        );
    };

    return (
        <div className="auth-root-container">
            <div className="auth-container">
                <h1>Welcome Back</h1>
                <p className="auth-tooltop">Login to access your account</p>
                {alert !== null ? <p className="auth-alert">{alert}</p> : null }
                <form onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        onChange={handleChange}
                        name="email"
                        required
                        placeholder="Email.."
                    />
                    <PasswordInput 
                        name="password"
                        autoComplete="on"
                        placeholder="Password.."
                        onChange={handleChange} />
                    <button className="auth-btn auth-btn-main" >Login</button>
                </form>
                <div className="hr-or">
                    <div><hr /></div>
                    <div><label>or</label></div>
                    <div><hr /></div>
                </div>
                <div className="auth-third-party">
                    <ThirdPartyLogin />
                </div>
                <div className="auth-swap-container">
                    <div>
                        <label>Don't have an account?</label>
                        <Link to={"/signup"}>Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;