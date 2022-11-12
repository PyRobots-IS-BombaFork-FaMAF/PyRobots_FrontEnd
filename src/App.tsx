import { BrowserRouter, Route, Routes } from "react-router-dom";

import NewSimulation from "./features/board/NewSimulation";
import CreateRobot from "./features/newrobot/CreateRobot";
import ListMatches from "./features/listMatches/ListMatches";
import SignIn from "./features/login/SignIn";
import NewGame from "./features/newGame/NewGame";
import NotFound from "./features/NotFound";
import Home from "./features/directories/Home";
import PersistLogin from "./features/PersistLogin";
import SignUp from "./features/register/SignUp";
import RequiereAuth from "./features/RequiereAuth";
import HistoryResults from "./features/results/results";

import "./App.css";
import { RobotLibrary } from "./features/listRobotsAndStats/RobotLibrary";

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
              <Route path="/robotLibrary" element={<RobotLibrary/>}/>
              <Route path="/Simulation/" element={<NewSimulation />} />
              <Route path="/createRobot" element={<CreateRobot />} />
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<HistoryResults />} />
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
