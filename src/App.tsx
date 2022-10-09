import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
