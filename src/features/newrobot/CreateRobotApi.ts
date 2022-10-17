import axios from "../../api/axios";

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
        return resolve(alert(response.data));
      })
      .catch(function (error) {
        alert(error.response.data.detail);
      });
  });
}

export default postRobot;
