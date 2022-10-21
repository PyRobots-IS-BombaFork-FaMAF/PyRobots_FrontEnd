import { robotInSimulationResult, simulationResult } from "./SimulationAPI";

// types
export type boardConfig = {
  x0: number;
  y0: number;
  size: number;
  robotsSize: number;
};
export type gameCoords = { x: number; y: number };
export type boardCoords = { x: number; y: number };

export type robotConfig = { name: string; color: string };
export type robotInFrameConfig = robotConfig & { coords: gameCoords };
export type robotInAnimationInfo = robotInSimulationResult & { color: string };
export type animationInfo = {
  rounds_amount: number;
  robots: Array<robotInAnimationInfo>;
};

// functions
export function gameToBoard_coordinates(
  board: boardConfig,
  gameCoords: gameCoords
): boardCoords {
  return {
    x: board.x0 + (gameCoords.x * board.size) / 1000,
    y: board.y0 + (gameCoords.y * board.size) / 1000,
  };
}

export function simulationResult_to_animationInfo(
  simulationResult: simulationResult
): animationInfo {
  return {
    rounds_amount: Math.max(
      ...simulationResult.map(
        (robot: robotInSimulationResult) => robot.rounds.length
      )
    ),
    robots: simulationResult.map(
      (robot: robotInSimulationResult, key: number) => {
        return {
          ...robot,
          color: ["red", "blue", "green", "yellow"][key], // There are no more than four robots in a game, so key < 4
        };
      }
    ),
  };
}
