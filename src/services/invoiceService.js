import axios from "axios";
import { token,url } from "../store/constant";


export const invoice_create = async (data) => {
    const response = await axios.post(url + "invoice-create", data, {
      headers: { Authorization: token },
    });
    return response.data;
  };

// export const payer_inquiry = async (data) => {
//   const response = await axios.post(url + "payer-inquiry", data, {
//     headers: { Authorization: token },
//   });
//   return response.data["payers"];
// };

// export const payer_update = async (data) => {
//   const response = await axios.post(url + "payer-update", data, {
//     headers: { Authorization: token },
//   });
//   console.log(response)
//   return response;
// };
