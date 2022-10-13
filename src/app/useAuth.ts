import { useContext } from "react";
import AuthContext from "../features/AuthProvider";

const useAuth: any = () => {
  return useContext(AuthContext);
};

export default useAuth;
