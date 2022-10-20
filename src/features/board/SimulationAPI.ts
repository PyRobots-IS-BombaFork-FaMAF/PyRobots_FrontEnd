export type robotInSimulationResult = {
  name: string;
  rounds: [
    {
      coords: { x: number; y: number };
      direction: number;
      speed: number;
    }
  ];
  cause_of_death?: "robot execution error";
};

export type simulationResult = Array<robotInSimulationResult>;
