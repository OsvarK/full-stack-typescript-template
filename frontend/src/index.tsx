import { createRoot } from 'react-dom/client';
import Router from "./router";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthenticationProvider, AuthContextdefaultProperties } from './contexts/authentication.context';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const App = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthenticationProvider 
                    methods={AuthContextdefaultProperties.methods}
                    user={AuthContextdefaultProperties.user}>
                    <Router />
                </AuthenticationProvider>
            </GoogleOAuthProvider>
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);