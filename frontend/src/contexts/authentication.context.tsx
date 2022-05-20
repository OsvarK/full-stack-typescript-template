import React, {createContext, useContext, FC, useEffect} from 'react';
import useLocalStorage from '../utils/localStorage.utils';

/** Authentication methods callback */
interface MethodCallBack { (data: Response): void; };



/** Defines a user */
export interface userData {
    accountType: string
    createdAt: string
    email: string
    emailVerified: boolean
    firstName: string
    isAdmin: boolean
    lastName: string
    updatedAt: string
    __v: number
    _id: string
};



/** Defines the AuthenticationContext */
interface IAuthenticationContext {
    getUserData: () => userData;
    logout: (callback: MethodCallBack) => void,
    login: (email: string, password: string, callback: MethodCallBack) => void,
    loginUsingGoogle: (googleToken: string, callback: MethodCallBack) => void,
    signup: (email: string, firstname: string, lastname: string, password: string, callback: MethodCallBack) => void
};



/** Initiate the context */
const AuthenticationContext = createContext<IAuthenticationContext>({
    login: () => null,
    logout: () => null,
    signup: () => null,
    loginUsingGoogle: () => null,
    getUserData: () => ({} as any) as userData
});



/** Defines the custom AuthenticationProvider and its methods */
export const AuthenticationProvider: FC<{children: React.ReactElement}> = ({children}) => {

    // Stores the user information
    const [user, SetUser] = useLocalStorage("userData");

    // On component load, verify the authentication
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


    /** Data that is being passed down the context */
    const value = {
        login,
        logout,
        signup,
        loginUsingGoogle,
        getUserData: () => user as userData
    }

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
}

/** Import this method to fetch the context in other components */
export const useAuth = () => useContext<IAuthenticationContext>(AuthenticationContext);