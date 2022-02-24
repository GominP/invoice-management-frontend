import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Allbill from "./component/SearchBar";
import Allget from "./TotalIncome";
import "./App.css";
import Payer from "./Payer";
import ResponsiveAppBar from "./component/ResponsiveAppBar"
import EnhancedTable from "./component/EnhancedTable"
import TotalIncome from "./TotalIncome";
import CheckBillInfo from "./CheckBillInfo";

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
          <Route path="/allbill/billinfo" element={<CheckBillInfo />} />


        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
