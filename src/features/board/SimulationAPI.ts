import axios from "../../api/axios";

export type newSimulationInfo = {
  robot1_id: number;
  robot2_id: number;
  robot3_id?: number;
  robot4_id?: number;
  amount_rounds: number;
};

type newSimulationInfoAPI = {
  robots: Array<{ id: number }>;
  rounds: { rounds: number };
};

export type robotInSimulationResult = {
  name: string;
  rounds: Array<{
    coords: { x: number; y: number };
    direction: number;
    speed: number;
    damage: number;
    missile?: { direction: number; distance: number };
    scanner?: { direction: number; resolution_in_degrees: number };
  }>;
  cause_of_death?: "robot execution error" | "out of life";
};

export type simulationResult = {
  board_size: number;
  missile_velocity: number;
  robots: Array<robotInSimulationResult>;
};

function newSimulationInfo_toAPI(
  newSimulationInfo: newSimulationInfo
): newSimulationInfoAPI {
  const res = {
    robots: [
      { id: newSimulationInfo.robot1_id },
      { id: newSimulationInfo.robot2_id },
    ],
    rounds: { rounds: newSimulationInfo.amount_rounds },
  };

  if (newSimulationInfo.robot3_id) {
    res.robots.push({ id: newSimulationInfo.robot3_id });
  }
  if (newSimulationInfo.robot4_id) {
    res.robots.push({ id: newSimulationInfo.robot4_id });
  }

  return res;
}

export function newSimulationAPI(
  newSimulation: newSimulationInfo,
  access_token: string | null
): Promise<simulationResult> {
  const newSimulationInfoAPI = newSimulationInfo_toAPI(newSimulation);

  return new Promise((resolve, reject) => {
    axios
      .post("simulation", newSimulationInfoAPI, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
