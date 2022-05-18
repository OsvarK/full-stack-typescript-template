import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkOutline, IoClose } from "react-icons/io5";
import ThirdPartyLogin from "../../components/thirdPartyLogin.cmpt";
import { useAuth } from "../../contexts/authentication.context";
import "./authenticate.css"

const SignupPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [hidePass, SetHidePass] = useState(true);
    const [alert, SetAlert] = useState(null);
    const [passValidation, SetPassValidation] = useState({
        lenght: false,
        symbol: false,
        number: false,
        uppercase: false,
        lowercase: false
    });

    const [input, SetInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "password") {

            const symbol = new RegExp("(?=.*?[#?!@$%^&*-])");
            const number = new RegExp("(?=.*?[0-9])");
            const uppercase = new RegExp("(?=.*?[A-Z])");
            const lowercase = new RegExp("(?=.*?[a-z])");

            SetPassValidation({
                lenght: e.target.value.length > 7,
                symbol: symbol.test(e.target.value),
                number: number.test(e.target.value),
                uppercase: uppercase.test(e.target.value),
                lowercase: lowercase.test(e.target.value)
            });
        }

        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validPass = passValidation.lenght &&
        passValidation.symbol &&
        passValidation.number &&
        passValidation.uppercase &&
        passValidation.lowercase;

        if (!validPass) {
            SetAlert("Password does not meet password requirements");
            return;
        }

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
                if (res.ok) return navigate("/p");
                res.json().then(msg => {
                    SetAlert(msg);
                });
            }
        );
    }

    return (
        <div className="form-container">
            <div><h1>Create your Account</h1></div>
            {alert !== null ?
            <div className="alert-container">
                <p>{alert}</p>
            </div> : null }
            <form onSubmit={handleSubmit}>
                <div className="input-container"><input onChange={handleChange} required type="text" name="firstName" placeholder="First name.." /></div>
                <div className="input-container"><input onChange={handleChange} required type="text" name="lastName" placeholder="Last name.." /></div>
                <div className="input-container"><input onChange={handleChange} required type="email" name="email" placeholder="Email.." /></div>
                <div className="input-container">
                    <input className="password-input" onChange={handleChange} required  type={hidePass ? "password" : "text"} name="password" placeholder="Password.." />
                    <div onClick={() => SetHidePass(!hidePass)} className="icon noselect">{hidePass ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
                </div>
                <div className="password-hint-container">
                    <div style={{color: passValidation.lowercase ? "black" : "#bcbecb"}}><div>{passValidation.lowercase ? <IoCheckmarkOutline /> : <IoClose />}</div><label>one uppercase</label></div>
                    <div style={{color: passValidation.uppercase ? "black" : "#bcbecb"}}><div>{passValidation.uppercase ? <IoCheckmarkOutline /> : <IoClose />}</div><label>one lowercase</label></div>
                    <div style={{color: passValidation.lenght ? "black" : "#bcbecb"}}><div>{passValidation.lenght ? <IoCheckmarkOutline /> : <IoClose />}</div><label>8 characters minimum</label></div>
                    <div style={{color: passValidation.number ? "black" : "#bcbecb"}}><div>{passValidation.number ? <IoCheckmarkOutline /> : <IoClose />}</div><label>must contain one number</label></div>
                    <div style={{color: passValidation.symbol ? "black" : "#bcbecb"}}><div>{passValidation.symbol ? <IoCheckmarkOutline /> : <IoClose />}</div><label>must contain one symbol</label></div>
                </div>
                <div className="input-container">
                    <input className="password-input" onChange={handleChange} required type={hidePass ? "password" : "text"} name="rePassword" autoComplete="off" placeholder="Confirme password.." />
                    <div onClick={() => SetHidePass(!hidePass)} className="icon noselect">{hidePass ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
                </div>
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