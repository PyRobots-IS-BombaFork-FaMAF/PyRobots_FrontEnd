import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../app/hooks/useAuth";

const RequiereAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiereAuth;
