import axios from "../../api/axios";
import swal from "sweetalert2";
import { Player } from "./JoinGame";

export function JoinGameApi(player: Player, access_token: string): Promise<any> {
  return new Promise((resolve, reject) => {
  axios
    .post(`game/${player.game_id}/join`, player, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      swal.fire("Se ha unido con exito", "", "success");
      return resolve("Not Error");
    })
    .catch(function (error: any) {
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
      return resolve(error.response.data.detail);
    });
  });
}
