import axios from "../../api/axios"

export function createMatchApi(newGame : any, access_token : string) : any{

 return new Promise((resolve, reject) => {
    axios.post("game/create",  newGame, {headers: { 
      'Authorization': `Bearer ${access_token}`, 
      'Content-Type': 'application/json'
      }
    })
    .then(response  => {
      alert(response.data.msg);
    })
    .catch(function (error : any) {
      alert(error.details.msg);
    });
 })
 
}