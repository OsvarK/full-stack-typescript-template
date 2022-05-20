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
    updatePassword: (newPassword: string, currentPassword: string, callback: MethodCallBack) => void,
    deleteAccount: (callback: MethodCallBack) => void,
    updateAccountInfo: (callback: MethodCallBack, firstname?: string, lastname?: string) => void
    getUserData: () => userData;
    logout: (callback: MethodCallBack) => void,
    login: (email: string, password: string, callback: MethodCallBack) => void,
    loginUsingGoogle: (googleToken: string, callback: MethodCallBack) => void,
    signup: (email: string, firstname: string, lastname: string, password: string, callback: MethodCallBack) => void
};



/** Initiate the context */
const AuthenticationContext = createContext<IAuthenticationContext>({
    updatePassword: () => null,
    updateAccountInfo: () => null,
    deleteAccount: () => null,
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
    useEffect(() => fetchUser(() => null), []);


    /** Verify/Fetches the users data */
    const fetchUser = (callback: () => void) => {
        var success = false;
        var resp: Response;
        fetch('/api/auth/verify')
        .then(res => {
            resp = res;
            if (res.status === 504) console.log('Unable to reach the backend, ' + res.statusText);
            success = res.ok;
            return res.json()
        })
        .then(data => {
            if(success) SetUser(data);
            else SetUser(null);
            callback();
        });
    }


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


    /** Update account information */
    const updateAccountInfo = (callback: MethodCallBack, firstname: string = user.firstName, lastname: string = user.lastName) => {
        fetch('/api/auth/update/info',
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "firstName": firstname,
                "lastName": lastname
            })
        }).then((res: Response) => {
            fetchUser(() => callback(res));
        });
    };

    /** Update account password */
    const updatePassword = (newPassword: string, currentPassword: string, callback: MethodCallBack) => {
        fetch('/api/auth/update/password',
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "newPassword": newPassword,
                "currentPassword": currentPassword
            })
        }).then((res: Response) => {
            fetchUser(() => callback(res));
        });
    };

    /** Delete account */
    const deleteAccount = (callback: MethodCallBack) => {
        fetch('/api/auth',
        {
            method: 'DELETE',
        }).then((res: Response) => callback(res));
    }


    /** Data that is being passed down the context */
    const value = {
        login,
        logout,
        signup,
        deleteAccount,
        loginUsingGoogle,
        updatePassword,
        updateAccountInfo,
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