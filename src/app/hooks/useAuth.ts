import { useContext, Dispatch, SetStateAction } from "react";
import AuthContext, { auth } from "../../features/AuthProvider";

function useAuth(): { auth: auth, setAuth: Dispatch<SetStateAction<{}>> } {
  return useContext(AuthContext);
};

export default useAuth;
