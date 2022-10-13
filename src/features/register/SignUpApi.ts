import { API } from "../../App";
import axios from "axios";

export function signUpApi(formData: FormData) {
  const baseURL: string = API + "users/register";

  axios
    .post(baseURL, formData)
    .then((res) => {
      if (res.status === 201) {
        alert(res.data[0]);
        console.log(res.data[0]);
      }
    })
    .catch((err) => {
      alert(err.response.data.detail);
    });
}
