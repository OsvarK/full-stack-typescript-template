import "./authentication.css";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "./components/thirdPartyLogin.cmpt";
import React, { FC, useState } from "react";
import PasswordInput from "./components/passwordInput.cmpt";
import { useAuth } from "../../contexts/authentication.context";
import CreatePassword from "./components/createPassword.cmpt";

const SignupPage: FC = () => {

    const auth = useAuth();
    const [alert, SetAlert] = useState<string | null>(null);
    const [input, SetInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.password !== input.rePassword) {
            SetAlert("Passwords don't match");
            return;
        }

        auth.signup(
            input.email,
            input.firstName,
            input.lastName,
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
                <h1>Welcome</h1>
                <p className="auth-tooltop">Create an account to continue</p>
                {alert !== null ? <p className="auth-alert">{alert}</p> : null }
                <form onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        onChange={handleChange}
                        name="firstname"
                        required
                        placeholder="First name.."
                    />
                    <input
                        className="auth-input"
                        onChange={handleChange}
                        name="lastName"
                        required
                        placeholder="Last name.."
                    />
                    <input
                        className="auth-input"
                        onChange={handleChange}
                        name="email"
                        required
                        placeholder="Email.."
                    />
                    <CreatePassword 
                        passwordName = "password"
                        confirmePasswordName = "rePassword"
                        passwordPlaceholder = "Password.."
                        confirmePasswordPlaceholder = "Confirme password.."
                        onChange={handleChange}
                    />
                    <button className="auth-btn auth-btn-main" >Sign up</button>
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
                        <label>Already have an account?</label>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;