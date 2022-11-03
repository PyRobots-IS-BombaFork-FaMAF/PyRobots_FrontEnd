import axios from "../../api/axios";
import swal, { SweetAlertResult } from "sweetalert2";

export async function postRobot(
  data: FormData
): Promise<SweetAlertResult<void>> {
  const access_token = localStorage.getItem("access_token")?.toString();

  return new Promise((resolve, reject) => {
    axios
      .post("robots/create", data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return resolve(
          swal.fire({
            title: response.data[0],
            icon: "success",
            confirmButtonColor: "#43B647",
          })
        );
      })
      .catch(function (error) {
        swal.fire({
          title: "Error",
          text: error.response.data.detail,
          icon: "error",
          confirmButtonColor: "#43B647",
        });
        if (error.response.status === 401) {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  });
}
