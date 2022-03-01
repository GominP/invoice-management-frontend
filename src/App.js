import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import Payer from "./pages/Payer";
import ResponsiveAppBar from "./component/ResponsiveAppBar"
import AllInvoices from "./pages/AllInvoices"
import TotalIncome from "./pages/TotalIncome";
import CheckBillInfo from "./pages/CheckBillInfo";
import EarningCard from "./component/dashboardTotal/EarningCard";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Register"

const theme = createTheme({
  typography: {
    fontFamily: [
      'Mitr',
      'sans-serif',
    ].join(','),
  },});

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
          <Route path="/allbill/billinfo" element={<EarningCard />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/editprofie" element={<EditProfile />} />




        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
