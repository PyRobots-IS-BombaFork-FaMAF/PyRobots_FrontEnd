import swal from "sweetalert2";

import axios from "../../api/axios";

export type newGameInfo = {
  rounds?: number;
  games?: number;
  name: string;
  max_players?: number;
  min_players?: number;
  password?: string;
  robot?: string;
};

export function leaveMatchApi(roomId: string, access_token: string | null) {
  axios
    .post(
      `game/${roomId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      swal.fire({
        title: response.data.msg,
        icon: "success",
        confirmButtonColor: "#43B647",
      });
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
}
