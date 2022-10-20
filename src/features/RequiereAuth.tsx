import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequiereAuth(): JSX.Element {
  const location = useLocation();
  return localStorage.getItem("isLoggedIn") !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiereAuth;
