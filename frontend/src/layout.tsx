import React, { FC } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useAuth } from './contexts/authentication.context';

const Header: FC = () => {
    const auth = useAuth();

    return (
        <div className='header-root'>
            {
                auth.getUserData() === null ? (
                    <div>
                        <Link to={"/signup"}>Sign up</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                ) : (
                    <div>
                        {auth.getUserData().isAdmin ? <Link to={"/a"}>Admin Console</Link> : null}
                        <Link to="/p">My Profile</Link>
                        <Link to="/" onClick={() => auth.logout(() => null)}>Logout</Link>
                    </div>
                )
            }
        </div>
    );
}


const AppLayout: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default AppLayout;