import axios from "axios";
import { token, url } from "../store/constant";

export const invoice_create = async (data) => {
  const response = await axios.post(url + "invoice-create", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const invoice_inquiry = async (data) => {
  const response = await axios.post(url + "invoice-inquiry", data, {
    headers: { Authorization: token },
  });
  console.log(response.data);

  return response.data;
};

export const invoice_detail_inquiry = async (data) => {
  const response = await axios.post(url + "invoice-detail-inquiry", data, {
    headers: { Authorization: token },
  });
  console.log(response.data);
  return response.data;
};

export const invoice_status_update = async (data) => {
  const response = await axios.post(url + "invoice-status-update", data, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const invoice_update = async (data) => {
  const response = await axios.post(url + "invoice-update", data, {
    headers: { Authorization: token },
  });
  return response.data;
};
