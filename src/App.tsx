import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import SignUp from "./features/register/SignUp";

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
