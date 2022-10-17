import axios from "../../api/axios"

export type newGameInfo = {
  rounds?: number,
  games?: number,
  name: string,
  max_players?: number,
  min_players?: number
}


export function createMatchApi(newGame: newGameInfo, access_token: string | null): any {

  return new Promise((resolve, reject) => {
    axios.post("game/create", newGame, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert(response.data.msg);
      })
      .catch(function (error: any) {
        alert(error.details.msg);
      });
  })

}