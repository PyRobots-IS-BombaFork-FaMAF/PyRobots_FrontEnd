import { robotInSimulationResult } from "./SimulationAPI";

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
export type animationInfo = Array<robotInAnimationInfo>;

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
