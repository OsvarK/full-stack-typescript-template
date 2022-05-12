import {createContext, useContext, FC, useEffect} from 'react';
import useLocalStorage from '../utils/localStorage.utils';

export interface userData {

}

/** Defines the AuthenticationContext */
export interface IAuthenticationContext {
    children?: any,
    methods: {
        logout: (onSuccessRedirectTo: string) => void,
        login: (email: string, password: string, onSuccessRedirectTo: string) => void,
        loginUsingGoogle: (googleToken:string, onSuccessRedirectTo: string) => void
        signup: (email: string, firstname: string, lastname: string, password: string, onSuccessRedirectTo: string) => void
    },
    user: userData | null
}

/** Default properties for the AuthenticationContext */
export const AuthContextdefaultProperties = {
    methods: {
        login: () => null,
        logout: () => null,
        signup: () => null,
        loginUsingGoogle: () => null
    },
    user: null
}

// Creates the context and defines defualt values
const AuthenticationContext = createContext<IAuthenticationContext>(AuthContextdefaultProperties);

/** Defines the AuthenticationProvider and its methods */
export const AuthenticationProvider: FC<IAuthenticationContext> = ({children}) => {

    const [user, SetUser] = useLocalStorage("userData");

    useEffect(() => {
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
    }, []);

    /** Login the user using google credentials */
    const loginUsingGoogle = (googleToken: string, onSuccessRedirectTo: string) => {
        fetch('/api/auth/login/google',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"googleToken": googleToken})
        }).then(res => {
            if (res.status == 401) {
                console.log("Invalid credentials!")
                return;
            };
            if (res.ok) window.location.href = onSuccessRedirectTo;
            console.log(res)
        });
    }


    /** Login the user using email and password */
    const login = (email: string, password: string, onSuccessRedirectTo: string) => {
        fetch('/api/auth/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => {
            if (res.status == 401) {
                console.log("Invalid credentials!")
                return;
            };
            if (res.ok) window.location.href = onSuccessRedirectTo;
        });
    };


    /** Signup a user */
    const signup = (email: string, firstname: string, lastname: string, password: string, onSuccessRedirectTo: string) => {
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
        }).then(res => {
            if (res.ok) window.location.href = onSuccessRedirectTo;
            res.json().then(data => console.log(data))
        });
    };


    /** Logout the authenticated user */
    const logout = (onSuccessRedirectTo: string) => {
        fetch('/api/auth/logout')
        .then(() => {
            SetUser(null);
            window.location.href = onSuccessRedirectTo
        });
    };

    return (
        <AuthenticationContext.Provider value={{
            methods: {
                login,
                logout,
                signup,
                loginUsingGoogle
            },
            user
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuth = () => useContext<IAuthenticationContext>(AuthenticationContext);