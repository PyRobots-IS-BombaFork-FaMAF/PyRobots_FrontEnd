import { API } from "../../App";
import axios from "axios";
import { selectSignIn, setToken } from "../../reducers/signInSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
export async function signInApi(formData: FormData) : Promise<any>{
  const baseURL: string = API + "token";

  axios
    .post(baseURL, formData)
    .then((res) => {
      if (res.status === 200) {
        const token = res.data.access_token;
        console.log(token);
        return token;
      }
    })
    .catch((err) => {
      alert(err.response.data.detail);
      return "error";
    });
}
