import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.context"

export const PrivateRouteWrapper = ({restricted = false, redirectTo}) => {

  const auth = useAuth();
  return ((auth.user !== null) === restricted) ? <Navigate to={redirectTo} /> : <Outlet />;
};