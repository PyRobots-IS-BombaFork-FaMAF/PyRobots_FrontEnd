import axios from "axios";
import { API } from "../../App";

export function postUser(user: any) {
  const baseURL = API + "users/register";
  console.log(user);
  axios
    .post(baseURL, user)
    .then((res) => {
      alert(res.data[0]);
    })
    .catch((err) => {
      alert(err.response.data.detail);
    });
}
