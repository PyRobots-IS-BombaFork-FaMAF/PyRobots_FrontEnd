import axios from "../../api/axios"

export async function postRobot(data : any) : Promise<any>{

  const access_token = localStorage.getItem("access_token")?.toString();

 return new Promise((resolve, reject) => {
    axios.post("robots/create",  data, {headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data'
      }
    })
    .then(response  => {
      return resolve(response.data);
    })
    .catch(function (error : any) {
      console.log(error);
    });
 })
}

export default postRobot;
