import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./features/board/board";
import SignUp from "./features/register/SignUp";
import NewGame from "./features/newGame/NewGame";
import SignIn from "./features/login/SignIn";
import NotFound from "./features/NotFound";
import RequiereAuth from "./features/RequiereAuth";
import PersistLogin from "./features/PersistLogin";
import Home from "./features/directories/Home";
import CreateRobot from "./features/newrobot/CreateRobot";
import ListMatches from "./features/listMatches/ListMatches";
import NewSimulation from "./features/board/NewSimulation";
import { simulationResult } from "./features/board/SimulationAPI";

function App(): JSX.Element {
  const simulation: simulationResult = {
    board_size: 1000,
    missile_velocity: 4,
    robots: [
      {
        name: "Robot 1",
        rounds: [
          { coords: { x: 0, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 20 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 30, y: 20 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 30, y: 30 }, direction: 20, speed: 10, damage: 0 },
          {
            coords: { x: 40, y: 30 },
            direction: 20,
            speed: 10,
            damage: 0,
            missile: { direction: 135, distance: 60 },
          },
          { coords: { x: 40, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 60 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 70, y: 60 }, direction: 20, speed: 10, damage: 0.5 },
          { coords: { x: 70, y: 70 }, direction: 20, speed: 10, damage: 0.5 },
          { coords: { x: 80, y: 70 }, direction: 20, speed: 10, damage: 0.5 },
        ],
      },
    ],
  };

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
              <Route path="/tableroDePrueba/" element={Board(simulation)} />
              <Route path="/Simulation/" element={<NewSimulation />} />
              <Route path="/createRobot" element={<CreateRobot />} />
              <Route path="/" element={<Home />} />
              <Route path="/listMatches" element={<ListMatches />} />
              <Route path="/newGame" element={<NewGame />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
