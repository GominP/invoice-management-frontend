import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Payer from "./pages/Payer";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import AllInvoices from "./pages/AllInvoices";
import TotalIncome from "./pages/TotalIncome";
import CheckBillInfo from "./pages/CheckBillInfo";
import EarningCard from "./component/dashboardTotal/EarningCard";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Register";
import CreateBill from "./pages/CreateBill";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { thTH } from "@mui/material/locale";
import BillInfo from "./pages/BillInfo";
import DetailUser from "./pages/DetailUser";

const theme = createTheme(
  {
    typography: {
      fontFamily: ["Mitr", "sans-serif"].join(","),
    },
    palette: {
      background: {
        default: "#e4f0e2",
      },
    },
  },
  thTH
);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
          <Route path="/" element={<AllInvoices />} />
          <Route path="/payer" element={<Payer />} />
          <Route path="/allget" element={<TotalIncome />} />
          <Route path="/allbill" element={<AllInvoices />} />
          <Route path="/allbill/billinfo/:id" element={<BillInfo />} />
          <Route path="/detailUser" element={<DetailUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/payer/bill" element={<CreateBill />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
