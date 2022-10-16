import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth"
import { verifyToken } from "./TokenUtils";




const PersistLogin = () => {
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
    if(auth?.access_token === undefined){
      verifyToken(setAuth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
     {isLocation ?  <Navigate to="/tableroDePrueba" state={{ from: location }} replace /> :
          <Outlet/>
        }
    </div>
  )
}

export default PersistLogin;
