import axios from "../../api/axios";

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
        alert(response.data.msg);
      })
      .catch(function (error) {
        alert(error.details.msg);
      });
  });
}
