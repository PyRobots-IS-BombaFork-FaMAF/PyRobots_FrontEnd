import axios from "../../api/axios";
import swal from 'sweetalert';

export function signUpApi(formData: FormData): void {
  axios
    .post("users/register", formData)
    .then((res) => {
      if (res.status === 201) {
        swal(res.data[0], "", "success");
      }
    })
    .catch((err) => {
      swal("Error",err.response.data.detail, "error");
    });
}
