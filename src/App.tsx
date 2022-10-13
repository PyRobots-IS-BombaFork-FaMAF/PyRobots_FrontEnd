import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import SignIn from "./features/login/SignIn";
import Unauthorized from "./features/Unauthorized";
import NotFound from "./features/NotFound";
import RequiereAuth from "./features/RequiereAuth"

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
        <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<SignIn/>} />
        <Route path="/Unauthorized" element ={<Unauthorized/>}/>
        
        <Route element={<RequiereAuth/>}>
          <Route path="/tableroDePrueba/" element={<Board />} />
        </Route>
          
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
