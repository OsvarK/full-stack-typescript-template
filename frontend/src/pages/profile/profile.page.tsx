import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/authentication.context";

const ProfilePage = () => {

    const auth = useAuth();

    useEffect(() => {
        
    }, []);

    const [input, SetInput] = useState({
        firstName: auth.methods.getUserData().firstName,
        lastName: auth.methods.getUserData().lastName,
        email: auth.methods.getUserData().email,
        password: "",
        rePassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
            <form>
                <div className="input-container">
                    <input
                        onChange={handleChange}
                        value={input.firstName}
                        type="text"
                        name="firstName"
                        placeholder="First name.." 
                    />
                </div>
                <div className="input-container">
                    <input
                        onChange={handleChange}
                        value={input.lastName}
                        type="text"
                        name="lastName"
                        placeholder="Last name.."
                    />
                </div>
            </form>
            <form>
                <div className="input-container">
                    <input
                        onChange={handleChange}
                        value={input.email}
                        type="email"
                        name="email"
                        placeholder="Email.."
                    />
                </div>
            </form>
            <form>
                <div className="input-container">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        placeholder="Password.."
                    />
                </div>
                <div className="input-container">
                    <input
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        placeholder="Confirme password.."
                    />
                </div>
            </form>
        </div>
    );
}

export default ProfilePage;