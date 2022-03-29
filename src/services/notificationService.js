import axios from "axios";
import { token, url } from "../store/constant";

export const notification_inquiry = async (data) => {
  const response = await axios.post(url + "notification-inquiry", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const notification_unread_count_inquiry = async (data) => {
  const response = await axios.post(
    url + "notification-unread-count-inquiry",
    data,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};
