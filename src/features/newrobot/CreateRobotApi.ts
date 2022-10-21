import axios from "../../api/axios";
import swal from 'sweetalert';
export async function postRobot(data: FormData): Promise<void> {
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
        return resolve(swal(response.data[0], "", "success"));
      })
      .catch(function (error) {
        swal("Error", error.response.data.detail, "error");
      });
  });
}

export default postRobot;
