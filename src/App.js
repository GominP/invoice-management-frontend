import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Allbill from "./Allbill";
import Allget from "./Allget";
import "./App.css";
import Payer from "./Payer";
import ResponsiveAppBar from "./ResponsiveAppBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Allbill />} />
        <Route path="payer" element={<Payer />} />
        <Route path="allbill" element={<Allbill />} />
        <Route path="allget" element={<Allget />} />



      
      </Routes>
    </div>
  );
}

export default App;
