import axios from "../../api/axios";
import swal from 'sweetalert';
export type newGameInfo = {
  rounds?: number;
  games?: number;
  name: string;
  max_players?: number;
  min_players?: number;
  password?: string;
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
        swal(response.data.msg, "", "success");
      })
      .catch(function (error) {
        swal("Error", error.details.msg, "error");
      });
  });
}