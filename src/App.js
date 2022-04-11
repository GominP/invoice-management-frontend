import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Payer from "./pages/Payer";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import AllInvoices from "./pages/AllInvoices";
import TotalIncome from "./pages/TotalIncome";
import EarningCard from "./component/dashboardTotal/EarningCard";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Register";
import CreateBill from "./pages/CreateBill";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { thTH } from "@mui/material/locale";
import BillInfo from "./pages/BillInfo";
import DetailUser from "./pages/DetailUser";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AddBiller from "./pages/AddBiller";
import PaymentDetailSuccess from "./pages/PaymentDetailSuccess";
import { useEffect } from "react";
import AllPayment from "./pages/AllPayment";
import PaymentDetail from "./pages/PaymentDetail";
import EditBill from "./pages/EditBill";
import NewRegister from "./pages/newRegister";
import RegisterOld from "./pages/Register";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const theme = createTheme(
  {
    typography: {
      fontFamily: ["Kanit", "sans-serif"].join(","),
    },
    palette: {
      // mode: "dark",
      background: {
        default: "#bbdefb",
      },
    },
  }
  // thTH
);
const path = window.location.pathname;
const queryClient = new QueryClient();

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {path === "/" || path.includes("/register") ? (
            <box></box>
          ) : (
            <ResponsiveAppBar></ResponsiveAppBar>
          )}

          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/addBiller" element={<AddBiller />} />
            <Route path="/paymentDetail/:id" element={<PaymentDetail />} />
            <Route path="/payer" element={<Payer />} />
            <Route path="/allget" element={<TotalIncome />} />
            <Route path="/allbill" element={<AllInvoices />} />
            <Route path="/allbill/billinfo/:id" element={<BillInfo />} />
            <Route path="/detailUser/:id/:status" element={<DetailUser />} />
            <Route path="/register/:role" element={<NewRegister />} />
            <Route path="/editprofile/:role" element={<EditProfile />} />
            <Route path="/payer/bill/:id" element={<CreateBill />} />
            <Route
              path="/allbill/editBill/:id/:payerId"
              element={<EditBill />}
            />
            <Route path="/new" element={<RegisterOld />} />

            <Route path="/paymentsuccess" element={<PaymentDetailSuccess />} />
            <Route path="/payment" element={<AllPayment />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
