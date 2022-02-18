import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Allbill from "./Allbill";
import Allget from "./Allget";
import "./App.css";
import Payer from "./Payer";
import Testbar from "./Testbar"
import Newbar from "./component/Newbar"
import ButtonAppBar from "./component/ButtonAppBar"
import EnhancedTable from "./EnhancedTable"

import ResponsiveAppBar from "./ResponsiveAppBar";

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
        <Newbar></Newbar>
        {/* <ButtonAppBar></ButtonAppBar> */}
        {/* <Testbar></Testbar>
        <ResponsiveAppBar></ResponsiveAppBar> */}
        <Routes>
          <Route path="/" element={<Allbill />} />
          <Route path="payer" element={<Payer />} />
          <Route path="allbill" element={<Allbill />} />
          <Route path="allget" element={<EnhancedTable />} />

        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
