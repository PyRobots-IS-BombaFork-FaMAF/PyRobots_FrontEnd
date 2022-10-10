import { API } from "../../App";
import axios from "axios";

export function postUser(formData: FormData) {
  const baseURL: string = API + "users/register";

  axios
    .post(baseURL, formData)
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        alert(res.data[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.detail);
    });
}
