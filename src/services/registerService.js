import axios from "axios";

const KEYS = {
  registerData: "registerData",
};
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

export function postRegiter(data) {
  axios.post(
    "http://localhost:8080/register",
    data).then(function (response) {
      localStorage.setItem("token", response.data["jwtToken"]);
      console.log(response.data["jwtToken"]);
    });
}
