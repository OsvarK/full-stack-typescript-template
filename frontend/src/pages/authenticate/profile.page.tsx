import React, { useEffect } from "react";
import { useState } from "react";
import useLocalStorage from '../../utils/localStorage.utils';
import { useAuth } from "../../contexts/authentication.context";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import CreatePassword from "./components/createPassword.cmpt";

const ProfilePage = () => {

    const [hidePass, SetHidePass] = useState(true);
    const [alert, SetAlert] = useState(null);
    const auth = useAuth();
    const [window, SetWindow] = useLocalStorage('profile-widget');
    const [input, SetInput] = useState({
        firstName: auth.methods.getUserData().firstName,
        lastName: auth.methods.getUserData().lastName,
        email: auth.methods.getUserData().email,
        password: "",
        rePassword: "",
        currentPassword: ""
    });

    useEffect(() => {
        if (window === null) SetWindow(1);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

    const Alert = () => {
        if(alert !== null) {
            return (
                <div className="alert-container">
                    <p>{alert}</p>
                </div>
            );
        }
        return null;
    };

    const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
    }

    const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div className="uk-container">
              <ul className="profile-menu-container">
                    <li onClick={() => SetWindow(1)} className="noselect" >Profile</li>
                    <li onClick={() => SetWindow(2)} className="noselect" >Password</li>
                    <li onClick={() => SetWindow(3)} className="noselect" >Settings</li>
                </ul>
            <div>
            </div>
            {/** Account information window */}
            { window === 1 ? (
                <div className="form-container">
                    <div><h1>Update Account</h1></div>
                    <Alert />
                    <form onSubmit={handleSubmitProfile}>
                        <div className="input-container">
                            <input 
                            value={input.firstName}
                            onChange={handleChange}
                            required type="text"
                            name="firstName"
                            placeholder="First name.." />
                        </div>
                        <div className="input-container">
                            <input 
                            value={input.lastName}
                            onChange={handleChange}
                            required type="text"
                            name="lastName"
                            placeholder="Last name.." />
                        </div>
                        <div className="input-container">
                            <input 
                            value={input.email}
                            onChange={handleChange}
                            required type="email"
                            name="email"
                            placeholder="Email.." />
                        </div>
                        <button className="btn1">Update account information</button>
                    </form>
                </div>
            ) : null }
            {/** Password window */}
            { window === 2 ? (
                <div className="form-container">
                    <div><h1>Change Password</h1></div>
                    <Alert />
                    <form onSubmit={handleSubmitPassword}>
                        <CreatePassword input={input} SetInput={SetInput} />
                        <button className="btn1">Update password</button>
                    </form>
                </div>
            ) : null }
            {/** Settings window */}
            { window === 3 ? (
                <div className="form-container">
                    <div><h1>Settings</h1></div>
                    <Alert />
                    <button className="btn2 btn1">Logout</button>
                </div>
            ) : null }
        </div>
    );
};

export default ProfilePage;