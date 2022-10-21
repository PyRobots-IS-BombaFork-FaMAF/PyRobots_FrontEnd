import { Stage, Layer, Rect, Circle, Group } from "react-konva";

import {
  boardConfig,
  gameCoords,
  robotConfig,
  robotInFrameConfig,
  gameToBoard_coordinates,
  animationInfo,
  robotInAnimationInfo,
} from "./boardHelper";

import "./board.css";
import NavBar from "../directories/NavBar";

function BackGround(board: boardConfig): JSX.Element {
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

function Robot({
  board,
  robotConfig,
}: {
  board: boardConfig;
  robotConfig: robotInFrameConfig;
}): JSX.Element {
  const robot_board: gameCoords = gameToBoard_coordinates(
    board,
    robotConfig.coords
  );

  return (
    <Circle
      key={"Robot in board" + robotConfig.name}
      x={robot_board.x}
      y={robot_board.y}
      radius={board.robotsSize / 2}
      fill={robotConfig.color}
      stroke="black"
      strokeWidth={1}
    />
  );
}

function MainBoardWithRobots({
  board,
  robots,
}: {
  board: boardConfig;
  robots: robotInFrameConfig[];
}): JSX.Element {
  return (
    <Group>
      <BackGround
        x0={board.x0}
        y0={board.y0}
        size={board.size}
        robotsSize={board.robotsSize}
      />
      {robots.map((robot: robotInFrameConfig) =>
        Robot({ board: board, robotConfig: robot })
      )}
    </Group>
  );
}

function MainBoard({ robots }: { robots: robotInFrameConfig[] }): JSX.Element {
  const robot_size_relative: number = 0.02;
  const window_min_size: number = Math.min(
    window.innerWidth,
    window.innerHeight
  );
  const margin_percentage: number = 0.025;
  const margin: number = window_min_size * margin_percentage;

  return (
    <Stage width={window_min_size} height={window_min_size}>
      <Layer>
        <MainBoardWithRobots
          board={{
            x0: window_min_size * margin_percentage,
            y0: window_min_size * margin_percentage,
            size: window_min_size - 2 * margin,
            robotsSize: robot_size_relative * window_min_size,
          }}
          robots={robots}
        />
      </Layer>
    </Stage>
  );
}

export function RobotInfo(robot: robotConfig): JSX.Element {
  return (
    <div
      data-testid={"RobotInfo " + robot.name}
      key={"Robot in board" + robot.name}
    >
      <h3>
        <span style={{ color: robot.color }}>{"• "}</span>
        {robot.name}
      </h3>
      <p>{"Vida: 100%"}</p>
    </div>
  );
}

function SideText({ robots }: { robots: robotConfig[] }): JSX.Element {
  return (
    <div>
      <h1>Simulación</h1>
      {robots.map(RobotInfo)}
    </div>
  );
}

function renderFrame(animation: animationInfo, frame: number): JSX.Element {
  const robots: robotInFrameConfig[] = animation.robots.flatMap(
    (robot: robotInAnimationInfo) => {
      return robot.rounds.length < frame
        ? []
        : [
            {
              name: robot.name,
              color: robot.color,
              coords: robot.rounds[frame].coords,
            },
          ];
    }
  );

  return (
    <div className="Board" data-testid="Board">
      <div className="MainBoard">
        <MainBoard robots={robots} />
      </div>
      <div className="SideText">
        <SideText robots={robots} />
      </div>
    </div>
  );
}

export function Board(): JSX.Element {
  const robots: robotInFrameConfig[] = [
    { name: "robot1", color: "red", coords: { x: 500, y: 500 } },
    { name: "robot2", color: "blue", coords: { x: 200, y: 200 } },
    { name: "robot3", color: "green", coords: { x: 800, y: 200 } },
  ];

  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="Board" data-testid="Board">
        <div className="MainBoard">
          <MainBoard robots={robots} />
        </div>
        <div className="SideText">
          <SideText robots={robots} />
        </div>
      </div>
    </div>
  );
}

export default Board;
