import swal from "sweetalert2";

import axios from "../../api/axios";

export function uploadAvatarApi(avatar: FormData): void {
  const access_token = localStorage.getItem("access_token");
  axios
    .put("user/avatar", avatar, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
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

export default uploadAvatarApi;