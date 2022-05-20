import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        <div>
            <Link to={"/signup"}>Sign up</Link>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default LandingPage;