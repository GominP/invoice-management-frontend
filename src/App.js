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
// import OverwriteMomentBE from "./component/date/OverwriteMomentBE";
import FormattedInputs from "./pages/FormattedInputs";

const theme = createTheme({
  typography: {
    fontFamily: ["Mitr", "sans-serif"].join(","),
  },
  palette: {
    background: {
      default: "#e4f0e2",
    },
  },
  
},thTH);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <LocalizationProvider dateAdapter={DateAdapter} locale={"th"}> */}
          <CssBaseline />
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route path="/" element={<AllInvoices />} />
            <Route path="/payer" element={<FormattedInputs />} />
            <Route path="/allget" element={<TotalIncome />} />
            <Route path="/allbill" element={<AllInvoices />} />
            <Route path="/allbill/billinfo/:id" element={<CheckBillInfo />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editprofie" element={<EditProfile />} />
            <Route path="/payer/bill" element={<CreateBill />} />
          </Routes>
        {/* </LocalizationProvider> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
