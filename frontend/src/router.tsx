import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateAdminRouteWrapper, PrivateRouteWrapper } from "./utils/routes.util";
import SignupPage from "./modules/authentication/singup.page";
import LoginPage from "./modules/authentication/login.page";
import LandingPage from "./modules/landing/landing.page";
import ProfilePage from "./modules/authentication/profile.page";
import Page404 from "./modules/404/404.page";
import { FC } from "react";
import AdminPage from "./modules/admin/admin.page";
import AppLayout from "./layout";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<LandingPage />} />

                    {/* Private Routes */}
                    <Route path="/p" element={<PrivateRouteWrapper redirectTo='/login' />}>
                        <Route index element={<ProfilePage />} />
                    </Route>

                    {/* Restricted for authenticated users */}
                    <Route path="/" element={<PrivateRouteWrapper restricted={true} redirectTo='/p' />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignupPage />} />
                    </Route>

                    {/* Admin routes */}
                    <Route path="/a" element={<PrivateAdminRouteWrapper redirectTo="/" />}>
                        <Route index element={<AdminPage />} />
                    </Route>

                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;