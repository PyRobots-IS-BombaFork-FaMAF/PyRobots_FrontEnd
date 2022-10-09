import React from "react";
import logo from "./logo.svg";
import SignUp from "./features/register/SignUp";
import "./App.css";

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
