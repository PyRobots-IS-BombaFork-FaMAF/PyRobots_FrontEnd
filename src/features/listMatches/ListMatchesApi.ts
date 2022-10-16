import { axiosPrivate } from "../../api/axios"

export function listMatchesApi(userToken : string, filters : string) : any{
  console.log(userToken);
  console.log(filters);  
  axiosPrivate
      .post("game/list",{ 
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },  
        filters })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        }else if (res.status === 401){
          alert("Sin autorizacion");
        }
      })
      .catch((err) => {
        if(err.status === 401){
          alert("Err");
        }
      });
  }