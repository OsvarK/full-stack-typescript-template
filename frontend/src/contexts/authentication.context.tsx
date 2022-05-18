import {createContext, useContext, FC, useEffect} from 'react';
import useLocalStorage from '../utils/localStorage.utils';

export interface MethodCallBack {
    (data: Response): void;
}

export interface userData {

}

/** Defines the AuthenticationContext */
export interface IAuthenticationContext {
    children?: any,
    methods: {
        verify: (Callback: MethodCallBack) => void,
        logout: (callback: MethodCallBack) => void,
        login: (email: string, password: string, callback: MethodCallBack) => void,
        loginUsingGoogle: (googleToken:string, callback: MethodCallBack) => void,
        signup: (email: string, firstname: string, lastname: string, password: string, callback: MethodCallBack) => void
    },
    user: userData | null
}

/** Default properties for the AuthenticationContext */
export const AuthContextdefaultProperties = {
    methods: {
        login: () => null,
        logout: () => null,
        signup: () => null,
        verify: () => null,
        loginUsingGoogle: () => null
    },
    user: null
}

// Creates the context and defines defualt values
const AuthenticationContext = createContext<IAuthenticationContext>(AuthContextdefaultProperties);

/** Defines the AuthenticationProvider and its methods */
export const AuthenticationProvider: FC<IAuthenticationContext> = ({children}) => {

    const [user, SetUser] = useLocalStorage("userData");

    /** Login the user using google credentials */
    const loginUsingGoogle = (googleToken: string, callback: MethodCallBack) => {
        fetch('/api/auth/login/google',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"googleToken": googleToken})
        }).then((res: Response) => callback(res));
    }


    /** Login the user using email and password */
    const login = (email: string, password: string, callback: MethodCallBack) => {
        fetch('/api/auth/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then((res: Response) => callback(res));
    };


    /** Signup a user */
    const signup = (email: string, firstname: string, lastname: string, password: string, callback: MethodCallBack) => {
        fetch('/api/auth/signup',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "firstName": firstname,
                "lastName": lastname,
                "password": password
            })
        }).then((res: Response) => callback(res));
    };


    /** Logout the authenticated user */
    const logout = (callback: MethodCallBack) => {
        fetch('/api/auth/logout')
        .then((res: Response) => {
            SetUser(null);
            callback(res);
        });
    };

    /** Verify Authentication */
    const verify = (callback: MethodCallBack) => {
        var success = false;
        fetch('/api/auth/verify')
        .then(res => {
            if (res.status === 504) console.log('Unable to reach the backend, ' + res.statusText);
            success = res.ok;
            callback(res);
            return res.json()
        })
        .then(data => {
            if(success) SetUser(data);
            else SetUser(null);
        });
    }

    return (
        <AuthenticationContext.Provider value={{
            methods: {
                login,
                logout,
                signup,
                loginUsingGoogle,
                verify
            },
            user
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuth = () => useContext<IAuthenticationContext>(AuthenticationContext);