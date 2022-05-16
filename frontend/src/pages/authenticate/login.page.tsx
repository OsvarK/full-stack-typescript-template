import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ThirdPartyLogin from "../../components/thirdPartyLogin.cmpt";
import { useAuth } from "../../contexts/authentication.context";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "./authenticate.css"

const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [alert, SetAlert] = useState(null);
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
            (res: Response) => {
                if (res.ok) return navigate("/p");
                res.json().then(data => {
                    SetAlert(data);
                });
            }
        );
    }

    return (
        <div className="form-container">
            <div><h1>Welcome Back</h1></div>
            {alert !== null ?
            <div className="alert-container">
                <p>{alert}</p>
            </div> : null }
            <form onSubmit={handleSubmit}>
                <div className="input-container"><input required  onChange={handleChange} type="email" name="email" placeholder="Email.." /></div>
                <div className="input-container">
                    <input className="password-input" required  onChange={handleChange} type={hidePass ? "password" : "text"} name="password" autoComplete="off" placeholder="Password.." />
                    <div onClick={() => SetHidePass(!hidePass)} className="icon noselect">{hidePass ? <IoEyeOffOutline /> : <IoEyeOutline />}</div>
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