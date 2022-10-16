export const verifyToken = async (setAuth : Function) => {
  const username = localStorage.getItem("username")?.toString();
  const password = localStorage.getItem("password")?.toString();
  const access_token = localStorage.getItem("access_token")?.toString();
  if(username && password && access_token){
    setAuth({username, password, access_token})
  }
}