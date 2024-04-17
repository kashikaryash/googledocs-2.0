window.global ||= window;
import { useEffect, useCallback } from "react";
import useAuth from "../../../hooks/use-auth";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const { loadingAuth, isAuthenticated, refreshAccessToken } = useAuth();

  const handleRefreshAccessToken = useCallback(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    handleRefreshAccessToken();
  }, [handleRefreshAccessToken]);

  if (loadingAuth) {
    return <></>;
  } else {
    if (isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default AuthRoute;
