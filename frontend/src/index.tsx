import { createRoot } from 'react-dom/client';
import { FC } from 'react';
import Router from "./router";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthenticationProvider} from './contexts/authentication.context';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const App: FC = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthenticationProvider>
                        <Router />
                </AuthenticationProvider>
            </GoogleOAuthProvider>
        </>
    )
}

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);