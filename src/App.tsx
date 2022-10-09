import React from "react";
import "./App.css";
import SignUp from "./features/register/SignUp";

export const API = "http://127.0.0.1:8000/";
function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
