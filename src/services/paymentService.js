import axios from "axios";
import { token, url } from "../store/constant";

export const payment_qrcode_create = async (data) => {
  const response = await axios.post(url + "payment/qrcode-create", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const payment_slip_verification = async (data) => {
  const response = await axios.post(url + "payment/slip-verification", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const payment_inquiry = async (data) => {
  const response = await axios.post(url + "payment-inquiry", data, {
    headers: { Authorization: token },
  });
  return response.data;
};
