import axios from "../../api/axios";
import swal from "sweetalert2";
export type newGameInfo = {
  rounds?: number;
  games?: number;
  name: string;
  max_players?: number;
  min_players?: number;
  password?: string;
  robot?: string;
};

export function createMatchApi(
  newGame: newGameInfo,
  access_token: string | null
): Promise<void> {
  return new Promise((resolve, reject) => {
    axios
      .post("game/create", newGame, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
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
  });
}
