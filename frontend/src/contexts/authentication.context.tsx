import {createContext, useContext, FC, useEffect} from 'react';
import useLocalStorage from '../utils/localStorage.utils';

export interface MethodCallBack {
    (data: Response): void;
}

export interface userData {
    accountType: string
    createdAt: string
    email: string
    emailVerified: Boolean
    firstName: string
    isAdmin: Boolean
    lastName: string
    updatedAt: string
    __v: Number
    _id: string
}

/** Defines the AuthenticationContext */
export interface IAuthenticationContext {
    children?: any,
    methods: {
        getUserData: () => userData;
        logout: (callback: MethodCallBack) => void,
        login: (email: string, password: string, callback: MethodCallBack) => void,
        loginUsingGoogle: (googleToken: string, callback: MethodCallBack) => void,
        signup: (email: string, firstname: string, lastname: string, password: string, callback: MethodCallBack) => void
    }
}

// Creates the context and defines defualt values
const AuthenticationContext = createContext<IAuthenticationContext>({methods: {
    login: () => null,
    logout: () => null,
    signup: () => null,
    loginUsingGoogle: () => null,
    getUserData: () => ({} as any) as userData
}});

/** Defines the AuthenticationProvider and its methods */
export const AuthenticationProvider: FC<IAuthenticationContext> = ({children}) => {

    useEffect(()=>{
        var success = false;
        fetch('/api/auth/verify')
        .then(res => {
            if (res.status === 504) console.log('Unable to reach the backend, ' + res.statusText);
            success = res.ok;
            return res.json()
        })
        .then(data => {
            if(success) SetUser(data);
            else SetUser(null);
        });
    },[]);

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

    return (
        <AuthenticationContext.Provider value={{
            methods: {
                login,
                logout,
                signup,
                loginUsingGoogle,
                getUserData: () => user as userData
            }
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuth = () => useContext<IAuthenticationContext>(AuthenticationContext);