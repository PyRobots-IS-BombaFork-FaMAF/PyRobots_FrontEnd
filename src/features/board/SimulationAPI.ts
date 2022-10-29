export type robotInSimulationResult = {
  name: string;
  rounds: Array<{
    coords: { x: number; y: number };
    direction: number;
    speed: number;
    missil?: { direction: number, distance: number };
    scanner?: { direction: number, resolution_in_degrees: number };
  }>;
  cause_of_death?: "robot execution error";
};

export type simulationResult = {
  board_size: number;
  missil_velocity: number;
  robots: Array<robotInSimulationResult>;
};
