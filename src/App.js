import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Allbill from "./Allbill";
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

      
      </Routes>
    </div>
  );
}

export default App;
