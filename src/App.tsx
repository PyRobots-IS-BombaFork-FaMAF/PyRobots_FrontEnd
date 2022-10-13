import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import SignIn from "./features/login/SignIn";
import NotFound from "./features/NotFound";
import RequiereAuth from "./features/RequiereAuth";
import PersistLogin from "./features/PersistLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />


          {/* protected routes */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequiereAuth />}>
              <Route path="/tableroDePrueba/" element={<Board />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


