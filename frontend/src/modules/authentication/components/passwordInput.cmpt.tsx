import { FC, useState } from "react";
import "./../authentication.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const PasswordInput: FC<{ 
        name: string,
        autoComplete: string,
        placeholder: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }> = (props) => {

    const [hidePass, SetHidePass] = useState(true);

    return (
        <div className="password-input-container">
            <input
                required
                className="auth-input password-input"
                onChange={props.onChange}
                type={hidePass ? "password" : "text"}
                name={props.name}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder} />
            <div 
                onClick={() => SetHidePass(!hidePass)}
                className="password-icon noselect">{hidePass ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </div>
        </div>
    );
}

export default PasswordInput;