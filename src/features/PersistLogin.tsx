import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth"
import LoadingSpin from "react-loading-spin";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocation, setIsLocation] = useState(true);

  const location = useLocation();
  const { auth, setAuth } = useAuth();

  if(isLocation && location.pathname !== "/" && location.pathname !== "/login"){
    setIsLocation(false);
  }
  useEffect(() => {
    const verifyToken = async () => {
      const username = localStorage.getItem("username")?.toString();
      const password = localStorage.getItem("password")?.toString();
      const access_token = localStorage.getItem("access_token")?.toString();
      if(username && password && access_token){
        setAuth({username, password, access_token})
      }
      setTimeout(() =>{
        setIsLoading(false);
      }, 3000);
    }
    auth?.access_token === undefined ?  verifyToken() : setIsLoading(false);

  }, [])

  return (
    <div>
      <div>
        
      </div>
    <div>
      { isLoading ? 
        <div>
          <h2>Cargando..</h2>
          <LoadingSpin size = "500px" width = "50px"/>
        </div>
        : (isLocation ?  <Navigate to="/tableroDePrueba" state={{ from: location }} replace /> :
          <Outlet/>
        )}
    </div>
    </div>
  )
}

export default PersistLogin;
