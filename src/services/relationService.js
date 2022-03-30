import axios from "axios";
import { token } from "../store/constant";
import { url } from "../store/constant";

export async function relationship_create(data) {
  console.log(data);
  const response = await axios.post(url + "relationship-create", data, {
    headers: { Authorization: token },
  });

  return response;
}

export async function relationship_status_update(data) {
  console.log(data);
  // const response = await axios.post(url + "relationship-status-update", data, {
  //   headers: { Authorization: token },
  // });

  // return response;
}

export async function relationship_inquiry(data) {
  console.log(data);
  const response = await axios.post(url + "relationship-inquiry", data, {
    headers: { Authorization: token },
  });

  return response.data;
}
