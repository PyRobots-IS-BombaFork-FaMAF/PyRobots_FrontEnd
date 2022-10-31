import axios from "../../api/axios";

export type newSimulationInfo = {
  robot1_id: number,
  robot2_id: number,
  robot3_id?: number,
  robot4_id?: number,
  amount_rounds: number
}

export type robotInSimulationResult = {
  name: string;
  rounds: Array<{
    coords: { x: number; y: number };
    direction: number;
    speed: number;
    damage: number;
    missil?: { direction: number, distance: number };
    scanner?: { direction: number, resolution_in_degrees: number };
  }>;
  cause_of_death?: "robot execution error" | "out of life";
};

export type simulationResult = {
  board_size: number;
  missil_velocity: number;
  robots: Array<robotInSimulationResult>;
};

export function newSimulationAPI(
  newSimulation: newSimulationInfo,
  access_token: string | null
): Promise<simulationResult> {
  return new Promise((resolve, reject) => {
    axios
      .post("simulation", newSimulation, {
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