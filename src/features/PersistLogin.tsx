import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth";
import LoadingSpin from "react-loading-spin";
import { verifyToken } from "./TokenUtils";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocation, setIsLocation] = useState(true);

  const location = useLocation();
  const { auth, setAuth } = useAuth();

  if (
    isLocation &&
    location.pathname !== "/register" &&
    location.pathname !== "/login"
  ) {
    setIsLocation(false);
  }
  useEffect(() => {
    auth?.access_token === undefined
      ? verifyToken(setIsLoading, setAuth)
      : setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div></div>
      <div>
        {isLoading ? (
          <div>
            <h2>Cargando..</h2>
            <LoadingSpin size="500px" width="50px" data-testid="loading-spin" />
          </div>
        ) : isLocation ? (
          <Navigate to="/tableroDePrueba" state={{ from: location }} replace />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default PersistLogin;
