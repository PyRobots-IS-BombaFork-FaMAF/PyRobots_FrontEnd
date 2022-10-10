import { Stage, Layer, Rect, Circle } from 'react-konva';

import { boardConfig, gameCoords, robotConfig, gameToBoard_coordinates } from './boardHelper';


function BackGround(board: boardConfig) {
  return (
    <Rect
      x={board.x0}
      y={board.y0}
      width={board.size}
      height={board.size}
      fill="white"
      shadowBlur={10}
    />
  );
}


function RobotInBoard_Frame(config: {
  board: boardConfig,
  robotCoordinates: gameCoords,
  robotConfig: robotConfig
}) {
  const { board, robotCoordinates, robotConfig } = config

  const robot_board: gameCoords = gameToBoard_coordinates(board, robotCoordinates)

  return (
    <div>
      <BackGround
        x0={board.x0}
        y0={board.y0}
        size={board.size}
      />
      <Circle
        x={robot_board.x}
        y={robot_board.y}
        radius={robotConfig.size / 2}
        fill={robotConfig.color}
        stroke="black"
        strokeWidth={1}
      />
    </div>
  )
}


function Board() {

  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025
  const robot_size_relative: number = 0.02

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RobotInBoard_Frame
          board={{
            x0: window_min_size * margin_percentage,
            y0: window_min_size * margin_percentage,
            size: window_min_size * (1 - 2 * margin_percentage)
          }}
          robotCoordinates={{
            x: 500,
            y: 500
          }}
          robotConfig={{
            size: robot_size_relative * window_min_size,
            color: "red"
          }}
        />
      </Layer>
    </Stage>
  );
}

export default Board;
