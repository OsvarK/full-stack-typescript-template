import "./authentication.css";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "./components/thirdPartyLogin.cmpt";
import React, { FC, useState } from "react";
import { useAuth } from "../../contexts/authentication.context";
import CreatePassword from "./components/createPassword.cmpt";
import Alert, { IAlert } from "./components/alert.cmpt";

const SignupPage: FC = () => {

    const auth = useAuth();

    const [alert, SetAlert] = useState<IAlert>({
        show: false,
        ok: false,
        msg: ''
    });

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
            SetAlert({
                show: true,
                ok: false,
                msg: "Passwords don't match"
            });
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
                    SetAlert({
                        show: true,
                        ok: false,
                        msg: msg
                    });
                });
            }
        );
    };

    return (
        <div className="auth-root-container">
            <div className="auth-container">
                <h1>Welcome</h1>
                <Alert show={alert.show} ok={alert.ok} msg={alert.msg} />
                <form onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        onChange={handleChange}
                        name="firstName"
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