import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import Payer from "./pages/Payer";
import ResponsiveAppBar from "./component/ResponsiveAppBar"
import EnhancedTable from "./pages/EnhancedTable"
import TotalIncome from "./pages/TotalIncome";
import CheckBillInfo from "./pages/CheckBillInfo";
import ProductCard from "./component/ProductCard";
import EarningCard from "./component/EarningCard";

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
          <Route path="/" element={<EnhancedTable />} />
          <Route path="/payer" element={<Payer />} />
          <Route path="/allget" element={<TotalIncome />} />
          <Route path="/allbill" element={<EnhancedTable />} />
          <Route path="/allbill/billinfo" element={<EarningCard />} />



        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
