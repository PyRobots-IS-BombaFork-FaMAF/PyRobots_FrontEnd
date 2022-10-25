import axios from "../../api/axios";
import swal from 'sweetalert2';

export function signUpApi(formData: FormData): void {
  axios
    .post("users/register", formData)
    .then((res) => {
      if (res.status === 201) {
        swal.fire({
          title: res.data[0],
          icon: "success",
          confirmButtonColor: '#43B647'
        })
      }
    })
    .catch((err) => {
      swal.fire({
        title: "Error", 
        text: err.response.data.detail, 
        icon: "error",
        confirmButtonColor: '#43B647'
      });
    });
}
