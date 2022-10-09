import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./App.css";
import Board from "./features/board/board";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"/>
          <Route path="/tableroDePrueba/" element={<Board/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
