import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
<<<<<<< HEAD
import "./App.css";
import SignUp from "./features/register/SignUp";
=======

import "./App.css";
>>>>>>> develop

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" />
=======
          <Route path="/"/>
>>>>>>> develop
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
