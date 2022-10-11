import { Stage, Layer, Rect, Circle } from 'react-konva';

import { boardConfig, gameCoords, robotConfig, gameToBoard_coordinates } from './boardHelper';


import './board.css';

function BackGround(board: boardConfig) {
  return (
    <Rect
      x={board.x0}
      y={board.y0}
      width={board.size}
      height={board.size}
      fill="#FDFD96"
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


function MainBoard() {

  const robot_size_relative: number = 0.02
  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025
  const margin: number = window_min_size * margin_percentage

  return (
    <Stage width={window_min_size} height={window_min_size}>
      <Layer>
        <RobotInBoard_Frame
          board={{
            x0: window_min_size * margin_percentage,
            y0: window_min_size * margin_percentage,
            size: window_min_size - 2 * margin
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
  )
}

function SideText() {
  return (
    <div>
      <h1>
        Simulación
      </h1>
    </div>
  );
}

function Board() {
  return (
    <div className="Board">
      <div className="MainBoard">
        <MainBoard />
      </div>
      <div className="SideText">
        <SideText />
      </div>
    </div>
  );
}

export default Board;
