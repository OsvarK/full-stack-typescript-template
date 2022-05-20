import { FC, useState } from "react";
import "./../authentication.css";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import PasswordInput from "./passwordInput.cmpt";

const CreatePassword: FC<{
    passwordName: string,
    confirmePasswordName: string,
    passwordPlaceholder: string,
    confirmePasswordPlaceholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }> = (props) => {

    const [passValidation, SetPassValidation] = useState({
        lenght: false,
        symbol: false,
        number: false,
        uppercase: false,
        lowercase: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === props.passwordName) {

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

        props.onChange(e);
    }

    return (
        <div>
            <PasswordInput
                name={props.passwordName}
                autoComplete="on"
                placeholder={props.passwordPlaceholder}
                onChange={handleChange}
            />
            <div className="password-hint-container">
                <div style={{color: passValidation.lowercase ? "black" : "#bcbecb"}}><div>{passValidation.lowercase ? <IoCheckmarkOutline /> : <IoClose />}</div><label>one uppercase</label></div>
                <div style={{color: passValidation.uppercase ? "black" : "#bcbecb"}}><div>{passValidation.uppercase ? <IoCheckmarkOutline /> : <IoClose />}</div><label>one lowercase</label></div>
                <div style={{color: passValidation.lenght ? "black" : "#bcbecb"}}><div>{passValidation.lenght ? <IoCheckmarkOutline /> : <IoClose />}</div><label>8 characters minimum</label></div>
                <div style={{color: passValidation.number ? "black" : "#bcbecb"}}><div>{passValidation.number ? <IoCheckmarkOutline /> : <IoClose />}</div><label>must contain one number</label></div>
                <div style={{color: passValidation.symbol ? "black" : "#bcbecb"}}><div>{passValidation.symbol ? <IoCheckmarkOutline /> : <IoClose />}</div><label>must contain one symbol</label></div>
            </div>
            <PasswordInput
                name={props.confirmePasswordName}
                autoComplete="off"
                placeholder={props.confirmePasswordPlaceholder}
                onChange={handleChange}
            />
        </div>
    );
}

export default CreatePassword;