import { useEffect } from "react";

export const verifyToken = async (setAuth : Function) => {
  const username = localStorage.getItem("username")?.toString();
  const password = localStorage.getItem("password")?.toString();
  const access_token = localStorage.getItem("access_token")?.toString();
  if(username && password && access_token){
    setAuth({username, password, access_token})
  }
}


export const useToken = (auth : any, setIsLoggedIn : Function, setAuth : Function ) => {
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    if (auth.access_token === undefined) {
      verifyToken(setAuth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

