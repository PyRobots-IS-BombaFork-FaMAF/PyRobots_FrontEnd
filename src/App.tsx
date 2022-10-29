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
import { Lobby } from "./features/listMatches/Lobby";


function App(): JSX.Element {

  const props : any = {
    players: [
      {
      player: "player1",
      robot: "robot1",
      avatarPlayer: "../public/avatarPlayer.jpg",
      avatarRobot: "./public/avatarRobot.jpg"
      },
      {
        player: "player2",
        robot: "robot2",
        avatarPlayer: "../public/avatarPlayer.jpg",
        avatarRobot: "./public/avatarRobot.jpg"
      },
      {
        player: "player3",
        robot: "robot3",
        avatarPlayer: "../public/avatarPlayer.jpg",
        avatarRobot: "./public/avatarRobot.jpg"
      },
      {
        player: "player4",
        robot: "robot4",
        avatarPlayer: "../public/avatarPlayer.jpg",
        avatarRobot: "./public/avatarRobot.jpg"
      },
    ],
  }
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
              <Route path="/lobby" element ={<Lobby myKey={0} players={props.players}/>}/>
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
