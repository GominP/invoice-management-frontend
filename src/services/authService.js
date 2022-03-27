import axios from "axios";
import { url, token } from "../store/constant";

export function postRegiter(data) {
  axios.post(url + "register", data).then(function (response) {
    localStorage.setItem("token", response.data["jwtToken"]);
    console.log(response.data["jwtToken"]);
    window.location.href = "/";
  });
}

export async function login(data) {
  await axios
    .post(url + "login", data)
    .then(function (response) {
      localStorage.setItem("token", response.data["jwtToken"]);
      console.log(response.data["jwtToken"]);
      window.location.href = "/landing";
    })
    .finally(() => {
      console.log("Experiment completed");
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
  console.log(response)

  return response;
};

export const password_update = async (data) => {
  const response = await axios.post(url + "password-update", data, {
    headers: { Authorization: token },
  });
  return response;
};
