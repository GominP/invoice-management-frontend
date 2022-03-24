import axios from "axios";
import { url, token } from "../store/constant";

const KEYS = {
  registerData: "registerData",
  url: "http://localhost:8080/",
};

export function postRegiter(data) {
  axios.post(KEYS.url + "register", data).then(function (response) {
    localStorage.setItem("token", response.data["jwtToken"]);
    console.log(response.data["jwtToken"]);
    window.location.href = "/login";
  });
}

export async function login(data) {
  await axios.post(KEYS.url + "login", data).then(function (response) {
    localStorage.setItem("token", response.data["jwtToken"]);
    console.log(response.data["jwtToken"]);
    window.location.href = "/landing";
  });
}

export async function landing(data) {
  await axios
    .post(KEYS.url + "landing", data, {
      headers: { Authorization: token },
    })
    .then(function (response) {
      
    });
}

// ------------------------------------------
// export function insertRegister(data) {
//   let regisData = getAllRegisterData;
//   regisData.push(data);
//   localStorage.setItem(KEYS.registerData, JSON.stringify(data));
// }

// export function getAllRegisterData(){
//     if (localStorage.getItem(KEYS.registerData) === null) {
//         localStorage.setItem(KEYS.registerData,JSON.stringify([]))
//     }
//     return JSON.parse(localStorage.getItem(KEYS.registerData))
// }
