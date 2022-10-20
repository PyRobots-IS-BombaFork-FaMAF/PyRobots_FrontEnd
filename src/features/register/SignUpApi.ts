import axios from "../../api/axios";

export function signUpApi(formData: FormData): void {
  axios
    .post("users/register", formData)
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
