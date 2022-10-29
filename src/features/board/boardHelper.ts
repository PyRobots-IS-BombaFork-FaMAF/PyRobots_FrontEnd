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
export type robotInAnimationInfo = robotInSimulationResult & { color: string };
export type animationInfo = {
  board_size: number;
  rounds_amount: number;
  robots: Array<robotInAnimationInfo>;
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
  return {
    board_size: simulationResult.board_size,
    rounds_amount: Math.max(
      ...simulationResult.robots.map(
        (robot: robotInSimulationResult) => robot.rounds.length
      )
    ),
    robots: simulationResult.robots.map(
      (robot: robotInSimulationResult, key: number) => {
        return {
          ...robot,
          color: ["red", "blue", "green", "yellow"][key], // There are no more than four robots in a game, so key < 4
        };
      }
    ),
  };
}
