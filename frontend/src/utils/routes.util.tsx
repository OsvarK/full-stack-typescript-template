import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.context"

export const PrivateRouteWrapper = ({restricted = false, redirectTo}) => {
  const auth = useAuth();
  return ((auth.methods.getUserData() !== null) === restricted) ? <Navigate to={redirectTo} /> : <Outlet />;
};