import { robotInSimulationResult, simulationResult } from "./SimulationAPI";

// types
export type boardConfig = {
  board_size: number;
  x0: number;
  y0: number;
  size_in_screen: number;
  robotsSize: number;
};
export type gameCoords = { x: number; y: number };
export type boardCoords = { x: number; y: number };

export type robotConfig = { name: string; color: string };
export type robotInSideTextConfig = robotConfig & { life: number };
export type robotInFrameConfig = robotConfig & { coords: gameCoords };
export type missilInFrameConfig = {
  coords: gameCoords;
  direction: number;
  color: string;
};
export type robotInAnimationInfo = robotInSimulationResult & { color: string };
export type animationInfo = {
  board_size: number;
  rounds_amount: number;
  robots: Array<robotInAnimationInfo>;
  missils: Array<Array<missilInFrameConfig>>;
};

// functions
export function gameToBoard_coordinates(
  board: boardConfig,
  gameCoords: gameCoords
): boardCoords {
  return {
    x: board.x0 + (gameCoords.x * board.size_in_screen) / board.board_size,
    y: board.y0 + (gameCoords.y * board.size_in_screen) / board.board_size,
  };
}

export function simulationResult_to_animationInfo(
  simulationResult: simulationResult
): animationInfo {
  const rounds_amount: number = Math.max(
    ...simulationResult.robots.map(
      (robot: robotInSimulationResult) => robot.rounds.length
    )
  );

  const robots: Array<robotInAnimationInfo> = simulationResult.robots.map(
    (robot: robotInSimulationResult, key: number) => {
      return {
        ...robot,
        color: ["red", "blue", "green", "yellow"][key], // There are no more than four robots in a game, so key < 4
      };
    }
  );

  const missils: Array<Array<missilInFrameConfig>> = [];
  {
    // Calculate missils positions in each round
    const missil_velocity = simulationResult.missil_velocity;

    type missilsInSimulation = missilInFrameConfig & { distance_left: number };

    let actual_missils: Array<missilsInSimulation> = [];

    for (let i = 0; i < rounds_amount; i++) {
      // Update `actual_missils` positions
      actual_missils.forEach((missil: missilsInSimulation) => {
        missil.distance_left -= missil_velocity;
        missil.coords = {
          x: missil.coords.x + Math.cos(missil.direction * Math.PI / 180) * missil_velocity,
          y: missil.coords.y + Math.sin(missil.direction * Math.PI / 180) * missil_velocity,
        };
      });

      // Remove from `actual_missils` missils that have reached their destination
      actual_missils = actual_missils.filter((missil: missilsInSimulation) => {
        return missil.distance_left > 0;
      });

      // Add new missils to `actual_missils`
      robots.forEach((robot: robotInAnimationInfo) => {
        const missil = robot.rounds[i]?.missil;
        if (missil) {
          actual_missils.push({
            coords: robot.rounds[i].coords,
            direction: missil.direction,
            distance_left: missil.distance,
            color: robot.color,
          });
        }
      });

      // Add `actual_missils` to `missils`
      missils.push(
        actual_missils.map((missil: missilsInSimulation) => {
          return {
            coords: missil.coords,
            direction: missil.direction,
            color: missil.color,
          };
        })
      );
    }
  }

  return {
    board_size: simulationResult.board_size,
    rounds_amount: rounds_amount,
    robots: robots,
    missils: missils,
  };
}
