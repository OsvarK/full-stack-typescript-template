import React from "react";
import { useState } from "react";

const ProfilePage = () => {

    const [input, SetInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
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
                        type="text"
                        name="firstName"
                        placeholder="First name.." 
                    />
                </div>
                <div className="input-container">
                    <input
                        onChange={handleChange}
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