import axios from "axios";
import { token, url } from "../store/constant";

export const notification_inquiry = async (data) => {
  const response = await axios.post(url + "notification-inquiry", data, {
    headers: { Authorization: token },
  });
  return response.data;
};
