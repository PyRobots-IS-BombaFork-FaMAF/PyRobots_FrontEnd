import { API } from "../../App";

export async function postUser(user: any) {
  fetch(API + "users/register", {
    method: "POST",
    credentials: "same-origin",
    headers: {
     "Access-Control-Allow-Origin": "http://localhost:3000/",
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
      email_confirmation: false,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
