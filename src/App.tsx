import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import NewGame from "./features/newGame/NewGame";
import SignIn from "./features/login/SignIn";
import NotFound from "./features/NotFound";
import RequiereAuth from "./features/RequiereAuth";
import PersistLogin from "./features/PersistLogin";
import Home from "./features/directories/Home";
import CreateRobot from './features/newrobot/CreateRobot';
import ListMatches from "./features/listMatches/ListMatches";
import HistoricalResults from './features/results/results';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequiereAuth />}>
              <Route path="/tableroDePrueba/" element={<Board />} />
              <Route path="/createRobot" element= {<CreateRobot />} />
              <Route path="/" element={<Home />} />
              <Route path="/listMatches" element={<ListMatches/>}/>
              <Route path="/newGame" element={<NewGame/>}/>
              <Route path="/results" element={<HistoricalResults/>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
