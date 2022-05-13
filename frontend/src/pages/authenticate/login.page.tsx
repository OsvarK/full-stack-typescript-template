import { Link } from "react-router-dom";
import ThirdPartyLogin from "../../components/thirdPartyLogin.cmpt";
import "./authenticate.css"

const LoginPage = () => {
    return (
        <div className="form-container">
            <div><h1>Welcome Back</h1></div>
            <input type="email" name="email" placeholder="Email.." />
            <input type="password" name="password" placeholder="Password.." />
            <div>
                <button className="btn1">Login</button>
                <div className="hr-or">
                    <div><hr /></div>
                    <div><label>or</label></div>
                    <div><hr /></div>
                </div>
                <div className="third-party-container">
                    <ThirdPartyLogin />
                </div>
                <div className="swap-auth-container">
                    <p>Dont't have an account?</p>
                    <Link to={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;