import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import NewGame from "./features/newGame/NewGame";

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tableroDePrueba/" element={<Board />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" />
          <Route path="/newGame" element={<NewGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
