import { API } from "../../App";
import axios from "axios";

export function signInApi(formData: FormData) {
  const baseURL: string = API + "token";

  axios
    .post(baseURL, formData)
    .then((res) => {
      if (res.status === 200) {
        alert(res);
        const token = res.data;
        console.log(token.access_token);
      }
    })
    .catch((err) => {
      alert(err.response.data.detail);
    });
}
