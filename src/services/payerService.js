import axios from "axios";
import { token } from "../store/constant";
import { url } from "../store/constant";


export const payer_detail_inquiry = async (data) => {
    const response = await axios.post(url + "payer-detail-inquiry", data, {
      headers: { Authorization: token },
    });
    return response.data;
  };

export const payer_inquiry = async (data) => {
  const response = await axios.post(url + "payer-inquiry", data, {
    headers: { Authorization: token },
  });
  return response.data["payers"];
};

export const payer_update = async (data) => {
  const response = await axios.post(url + "payer-update", data, {
    headers: { Authorization: token },
  });
  console.log(response)
  return response;
};
