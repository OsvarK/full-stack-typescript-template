import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRouteWrapper } from "./utils/routes.util";
import LoginPage from "./pages/authenticate/login.page";
import SignupPage from "./pages/authenticate/signup.page";
import ProfilePage from "./pages/authenticate/profile.page";
import LandingPage from "./pages/landing/landing.page";
import Page404 from "./pages/404/404.page";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<LandingPage />} />

                    {/* Private Routes */}
                    <Route path="/p" element={<PrivateRouteWrapper redirectTo='/login' />}>
                        <Route index element={<ProfilePage />} />
                    </Route>

                    {/* Restricted for authenticated users */}
                    <Route path="/login" element={<PrivateRouteWrapper restricted={true} redirectTo='/p' />}>
                        <Route index element={<LoginPage />} />
                    </Route>
                    <Route path="/signup" element={<PrivateRouteWrapper restricted={true} redirectTo='/p' />}>
                        <Route index element={<SignupPage />} />
                    </Route>

                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;