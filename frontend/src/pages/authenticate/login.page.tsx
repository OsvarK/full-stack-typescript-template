import { useState } from "react";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "../../components/thirdPartyLogin.cmpt";
import { useAuth } from "../../contexts/authentication.context";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./authenticate.css"

const LoginPage = () => {
    const auth = useAuth();
    const [hidePass, SetHidePass] = useState(true);
    const [input, SetInput] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input)
        auth.methods.login(
            input.email,
            input.password,
            '/login'
        );
    }

    return (
        <div className="form-container">
            <div><h1>Welcome Back</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="input-container"><input onChange={handleChange} type="email" name="email" placeholder="Email.." /></div>
                <div className="input-container">
                    <input onChange={handleChange} type={hidePass ? "password" : "text"} name="rePassword"autoComplete="off" placeholder="Re-Password.." />
                    <div onClick={() => SetHidePass(!hidePass)} className="icon">{hidePass ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
                </div>
                <button className="btn1">Login</button>
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
                    <p>Don't have an account?</p>
                    <Link to={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;