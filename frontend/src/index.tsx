import { createRoot } from 'react-dom/client';
import Router from "./router"
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const App = () => {
    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Router />
            </GoogleOAuthProvider>
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);