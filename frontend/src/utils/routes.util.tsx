import { FC } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.context"

export const PrivateRouteWrapper: FC<{restricted?: boolean, redirectTo: string}> = ({restricted = false, redirectTo}) => {
  const auth = useAuth();
  return ((auth.getUserData() !== null) === restricted) ? <Navigate to={redirectTo} /> : <Outlet />;
};