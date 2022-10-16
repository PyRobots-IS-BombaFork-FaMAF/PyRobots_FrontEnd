import { API } from "../../App";
import axios from "axios";

const postRobot = (data: any) => {
  axios
    .post(API + "robots/create", data)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
};

export default postRobot;
