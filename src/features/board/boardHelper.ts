
// types
export type boardConfig = { x0: number, y0: number, size: number, robotsSize: number }
export type gameCoords = { x: number, y: number }
export type boardCoords = { x: number, y: number }

export type robotConfig = { color: string }



export function gameToBoard_coordinates(
  board: boardConfig,
  gameCoords: gameCoords
): boardCoords {

  return {
    x: board.x0 + gameCoords.x * board.size / 1000,
    y: board.y0 + gameCoords.y * board.size / 1000,
  };
}







