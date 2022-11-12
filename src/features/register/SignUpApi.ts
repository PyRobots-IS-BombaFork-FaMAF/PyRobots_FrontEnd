import swal from "sweetalert2";

import axios from "../../api/axios";

export function signUpApi(formData: FormData, navigate : Function): void {
  axios
    .post("users/register", formData)
    .then((res) => {
      if (res.status === 201) {
        swal.fire({
          title: res.data[0],
          icon: "success",
          confirmButtonColor: "#43B647",
        });
        navigate("/login", { replace: true });
      }
    })
    .catch((err) => {
      swal.fire({
        title: "Error",
        text: err.response.data.detail,
        icon: "error",
        confirmButtonColor: "#43B647",
      });
    });
}
