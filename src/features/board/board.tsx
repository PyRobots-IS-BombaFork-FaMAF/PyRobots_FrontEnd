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
  robotConfig: robotConfig
}) {

  const { board, robotConfig } = config
  const robot_board: gameCoords = gameToBoard_coordinates(board, robotConfig.coords)

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
  robots: robotConfig[]
}) {
  const { board, robots } = config

  return (
    <div>
      <BackGround
        x0={board.x0}
        y0={board.y0}
        size={board.size}
        robotsSize={board.robotsSize}
      />
      {
        robots.map((robot: robotConfig) => Robot({ board: board, robotConfig: robot }))
      }
    </div>
  )
}


function MainBoard(config: { robots: robotConfig[] }) {
  const { robots } = config

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
          robots={robots}
        />
      </Layer>
    </Stage>
  )
}

function SideText(config: { robots: robotConfig[] }) {
  const { robots } = config

  return (
    <div>
      <h1>
        Simulación
      </h1>
      {
        robots.map((robot: robotConfig) => {
          return (
            <div>
              <h3>
                <span style={{ color: robot.color }}>
                  {"• "}
                </span>
                {robot.name}
              </h3>
              <p>
                {"Vida: 100%"}
              </p>
            </div>
          )
        })
      }
    </div>
  );
}

function Board() {
  const robots: robotConfig[] = [
    { name: "robot1", color: "red", coords: { x: 500, y: 500 } },
    { name: "robot2", color: "blue", coords: { x: 200, y: 200 } },
    { name: "robot3", color: "green", coords: { x: 800, y: 200 } },
  ]

  return (
    <div className="Board">
      <div className="MainBoard">
        <MainBoard robots={robots} />
      </div>
      <div className="SideText">
        <SideText robots={robots} />
      </div>
    </div>
  );
}

export default Board;
