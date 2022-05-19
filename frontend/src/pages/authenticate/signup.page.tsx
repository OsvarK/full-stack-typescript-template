import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "./components/thirdPartyLogin.cmpt";
import CreatePassword from "./components/createPassword.cmpt";
import { useAuth } from "../../contexts/authentication.context";
import "./authenticate.css"

const SignupPage = () => {
    const auth = useAuth();
    const [alert, SetAlert] = useState(null);

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

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.password !== input.rePassword) {
            SetAlert("Passwords don't match");
            return;
        }

        auth.methods.signup(
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
    }

    return (
        <div className="form-container uk-container">
            <div><h1>Create your Account</h1></div>
            {alert !== null ?
            <div className="alert-container">
                <p>{alert}</p>
            </div> : null }
            <form onSubmit={handleSubmit}>
                <div className="input-container"><input onChange={handleChange} required type="text" name="firstName" placeholder="First name.." /></div>
                <div className="input-container"><input onChange={handleChange} required type="text" name="lastName" placeholder="Last name.." /></div>
                <div className="input-container"><input onChange={handleChange} required type="email" name="email" placeholder="Email.." /></div>
                <CreatePassword input={input} SetInput={SetInput} />
                <button className="btn1">Sign up</button>
            </form>
            <div>
                <div className="hr-or">
                    <div><hr /></div>
                    <div><label>or</label></div>
                    <div><hr /></div>
                </div>
                <div className="third-party-container">
                    <ThirdPartyLogin />
                </div>
                <div className="swap-auth-container">
                    <p>Already have an account?</p>
                    <Link to={"/login"}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;