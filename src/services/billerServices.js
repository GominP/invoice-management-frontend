import axios from "axios";
import { token } from "../store/constant";
import { url } from "../store/constant";

export function biller_detail_inquiry(data) {
  console.log(data);
  axios
    .post(url + "relationship-create", data, {
      headers: { Authorization: token },
    })
    .then(function (response) {
      console.log(response);
    });
}

export const biller_inquiry = async (data) => {
  const response = await axios
    .post(url + "biller-inquiry", data, {
      headers: { Authorization: token },
    })
    return response.data["billers"]
    // .then(function (response) {
    //   console.log(response.data["billers"]);
    //   return response.data["billers"];
    // })
    // .catch((err) => {
    //   return null;
    // });
};
