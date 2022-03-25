import axios from "axios";
import { token } from "../store/constant";
import { url } from "../store/constant";

export function relationship_create(data) {
  console.log(data);
  axios
    .post(url + "relationship-create", data, {
      headers: { Authorization: token },
    })
    .then(function (response) {
      console.log(response);
    });
}
