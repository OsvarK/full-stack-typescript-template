import { FC, useEffect, useState } from "react";

export interface IAlert {
    show: boolean,
    ok: boolean,
    msg: string
};

const Alert: FC<IAlert> = (alert) => {

    const alertStyle = () => {
        if (alert?.ok) {
            return {
                backgroundColor: '#4bc74b'
            }
        }
    }

    return alert.show ? <p style={alertStyle()} className="auth-alert">{alert.msg}</p> : null
}

export default Alert;