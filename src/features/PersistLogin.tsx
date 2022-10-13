import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react";
import useAuth from "../app/hooks/useAuth"
import LoadingSpin from "react-loading-spin";
import { margin } from "@mui/system";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  
   
  
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const username = localStorage.getItem("username")?.toString();
      const password = localStorage.getItem("password")?.toString();
      const access_token = localStorage.getItem("access_token")?.toString();
      if(username && password && access_token){
        setAuth({username, password, access_token})
      }
      const timer = setTimeout(() =>{
        setIsLoading(false);
      }, 3000);
    }
    console.log(`Resultado del op ternario ${auth?.access_token === undefined}`)
    auth?.access_token === undefined ?  verifyToken() : setIsLoading(false);

  }, [])

  useEffect (() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth)}` )
  })

  return (
    <div>
      { isLoading ? 
      <p>
        <h2>Cargando.. </h2>
        <LoadingSpin size = "400px" width = "40px"/>
       </p> : <Outlet/> }
    </div>
  )
}

export default PersistLogin;
