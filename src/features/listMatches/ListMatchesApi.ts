import axios from "../../api/axios"

export async function listMatchesApi(filters : any, access_token : string) : Promise<any>{

 return new Promise((resolve, reject) => {
    axios.post("game/list",  filters, {headers: { 
      'Authorization': `Bearer ${access_token}`, 
      'Content-Type': 'application/json'
      }
    })
    .then(response  => {
      return resolve(response.data);
    })
    .catch(function (error : any) {
      alert(error.response.data.detail);
    });
 })
 
}