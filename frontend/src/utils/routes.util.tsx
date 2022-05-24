import { FC } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.context"

/** Creates a prive route wrapper, that check if its a authenticated user. router wrapper can also be used for restrict authenticated users from page using restricted variable */
export const PrivateRouteWrapper: FC<{restricted?: boolean, redirectTo: string}> = ({restricted = false, redirectTo}) => {
  const auth = useAuth();
  return ((auth.getUserData() !== null) === restricted) ? <Navigate to={redirectTo} /> : <Outlet />;
};

/** Creates a private admin wrapper, routes under this wrapper can only be accessed by the admin */
export const PrivateAdminRouteWrapper: FC<{restricted?: boolean, redirectTo: string}> = ({redirectTo}) => {
  const auth = useAuth();
  return (auth.getUserData() !== null && !auth.getUserData().isAdmin) ? <Navigate to={redirectTo} /> : <Outlet />;
};