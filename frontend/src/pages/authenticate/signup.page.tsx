import { Link } from "react-router-dom";
import ThirdPartyLogin from "../../components/thirdPartyLogin.cmpt";
import "./authenticate.css"


const SignupPage = () => {
    return (
        <div className="form-container">
            <div><h1>Create your Account</h1></div>
            <input type="text" name="firstName" placeholder="First name.." />
            <input type="text" name="lastName" placeholder="Last name.." />
            <input type="email" name="email" placeholder="Email.." />
            <input type="password" name="password" placeholder="Password.." />
            <input type="password" autoComplete="off" placeholder="Re-Password.." />
            <div>
                <button className="btn1">Sign Up</button>
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