import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import SignIn from "./features/login/SignIn";

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tableroDePrueba/" element={<Board />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
