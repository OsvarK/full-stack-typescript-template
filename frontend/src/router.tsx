import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRouteWrapper } from "./utils/routes.util";
import LoginPage from "./pages/login.page";
import ProfilePage from "./pages/profile.page";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">

                    <Route index element={<LoginPage />} />

                    {/* Private Routes */}
                    <Route path="/p" element={<PrivateRouteWrapper redirectTo='/login' />}>
                        <Route index element={<ProfilePage />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;