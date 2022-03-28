import axios from "axios";
import { token } from "../store/constant";
import { url } from "../store/constant";

export const biller_inquiry = async (data) => {
  const response = await axios.post(url + "biller-inquiry", data, {
    headers: { Authorization: token },
  });
  return response.data["billers"];
};

export const biller_update = async (data) => {
  const response = await axios.post(url + "biller-update", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const biller_detail_inquiry = async (data) => {
  // console.log(data)
  const response = await axios.post(url + "biller-detail-inquiry", data, {
    headers: { Authorization: token },
  });

  console.log(response);
  return response.data;
};
