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

function Robot(config: {
  board: boardConfig,
  robotCoordinates: gameCoords,
  robotConfig: robotConfig
}) {

  const { board, robotCoordinates, robotConfig } = config
  const robot_board: gameCoords = gameToBoard_coordinates(board, robotCoordinates)

  return (
    <Circle
      x={robot_board.x}
      y={robot_board.y}
      radius={board.robotsSize / 2}
      fill={robotConfig.color}
      stroke="black"
      strokeWidth={1}
    />
  )
}

function MainBoardWithRobot(config: {
  board: boardConfig,
  robotCoordinates: gameCoords,
  robotConfig: robotConfig
}) {
  const { board, robotCoordinates, robotConfig } = config

  return (
    <div>
      <BackGround
        x0={board.x0}
        y0={board.y0}
        size={board.size}
        robotsSize={board.robotsSize}
      />
      <Robot
        board={board}
        robotCoordinates={robotCoordinates}
        robotConfig={robotConfig}
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
        <MainBoardWithRobot
          board={{
            x0: window_min_size * margin_percentage,
            y0: window_min_size * margin_percentage,
            size: window_min_size - 2 * margin,
            robotsSize: robot_size_relative * window_min_size
          }}
          robotCoordinates={{
            x: 500,
            y: 500
          }}
          robotConfig={{
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
