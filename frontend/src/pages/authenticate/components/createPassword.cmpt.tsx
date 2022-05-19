import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkOutline, IoClose } from "react-icons/io5";

const CreatePassword = ({input, SetInput}) => {
    const [hidePass, SetHidePass] = useState(true);

    const [passValidation, SetPassValidation] = useState({
        lenght: false,
        symbol: false,
        number: false,
        uppercase: false,
        lowercase: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "password") {

            const symbol = new RegExp("(?=.*?[#?!@$%^&*-])");
            const number = new RegExp("(?=.*?[0-9])");
            const uppercase = new RegExp("(?=.*?[a-z])");
            const lowercase = new RegExp("(?=.*?[A-Z])");

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

    return (
        <div>
            <div className="input-container">
                <input className="password-input" onChange={handleChange} required type={hidePass ? "password" : "text"} name="password" placeholder="Password.." />
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
        </div>
    );
};

export default CreatePassword;