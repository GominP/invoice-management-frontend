import axios from "axios";
import { url, token } from "../store/constant";

export function postRegiter(data) {
  // console.log(data)
  axios.post(url + "register", data).then(function (response) {
    localStorage.setItem("token", response.data["jwtToken"]);
    console.log(response.data["jwtToken"]);
    // window.location.href = "/";
  });
}

export async function login(data) {
  await axios.post(url + "login", data).then(function (response) {
    localStorage.setItem("token", response.data["jwtToken"]);
    console.log(response.data["jwtToken"]);
    window.location.href = "/landing";
  });
}

export const landing = async () => {
  const response = await axios.post(
    url + "landing",
    {},
    {
      headers: { Authorization: token },
    }
  );

  return response;
};

export const password_update = async (data) => {
  const response = await axios.post(url + "password-update", data, {
    headers: { Authorization: token },
  });
  return response;
};

export const username_exists = async (data) => {
  const response = await axios.post(
    url + "username-exists",
    { username: data },
    {
      headers: { Authorization: token },
    }
  );
  return response;
};
