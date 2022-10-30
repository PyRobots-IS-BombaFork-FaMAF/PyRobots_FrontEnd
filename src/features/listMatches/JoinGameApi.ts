import axios from "../../api/axios";
import swal from "sweetalert2";
import { Player } from "./ListMatches";

export function JoinGameApi(player : Player, access_token: string): any {
      axios
        .post(`game/${player.game_id}/join`, player, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          swal.fire("Se ha unido con exito", "", "success");
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
        });
  }