import { Stage, Layer, Rect, Circle, Group } from "react-konva";

import {
  boardConfig,
  gameCoords,
  robotInFrameConfig,
  gameToBoard_coordinates,
  animationInfo,
  robotInAnimationInfo,
  robotInSideTextConfig,
  simulationResult_to_animationInfo,
} from "./boardHelper";

import { simulationResult } from "./SimulationAPI";
import { Animate } from "./Animation";

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
      {robots.map((robot: robotInFrameConfig) => (
        <Robot board={board} robotConfig={robot} />
      ))}
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

export function RobotInfo(robot: robotInSideTextConfig): JSX.Element {
  return (
    <div
      data-testid={"RobotInfo " + robot.name}
      key={"Robot in board" + robot.name}
    >
      <h3>
        <span style={{ color: robot.color }}>{"• "}</span>
        {robot.name}
      </h3>
      <p>{`Vida: ${robot.life * 100}%`}</p>
    </div>
  );
}

function SideText({
  robots,
}: {
  robots: robotInSideTextConfig[];
}): JSX.Element {
  return (
    <div>
      <h1>Simulación</h1>
      {robots.map(RobotInfo)}
    </div>
  );
}

export function renderFrame(
  animation: animationInfo,
  frame: number
): JSX.Element {
  const robotsInGame: robotInFrameConfig[] = animation.robots.flatMap(
    (robot: robotInAnimationInfo) => {
      return robot.rounds.length <= frame
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

  const robotsInSideText: robotInSideTextConfig[] = animation.robots.map(
    (robot: robotInAnimationInfo) => {
      return {
        name: robot.name,
        color: robot.color,
        life: robot.rounds.length <= frame ? 0 : 1,
      };
    }
  );

  return (
    <div className="Board" data-testid="Board">
      <div className="MainBoard">
        <MainBoard robots={robotsInGame} />
      </div>
      <div className="SideText">
        <SideText robots={robotsInSideText} />
      </div>
    </div>
  );
}

export function Board(): JSX.Element {
  const simulation: simulationResult = [
    {
      name: "Robot 1",
      rounds: [
        { coords: { x: 0, y: 0 }, direction: 20, speed: 10 },
        { coords: { x: 10, y: 0 }, direction: 20, speed: 10 },
        { coords: { x: 10, y: 10 }, direction: 20, speed: 10 },
        { coords: { x: 20, y: 10 }, direction: 20, speed: 10 },
        { coords: { x: 20, y: 20 }, direction: 20, speed: 10 },
        { coords: { x: 30, y: 20 }, direction: 20, speed: 10 },
        { coords: { x: 30, y: 30 }, direction: 20, speed: 10 },
        { coords: { x: 40, y: 30 }, direction: 20, speed: 10 },
        { coords: { x: 40, y: 40 }, direction: 20, speed: 10 },
        { coords: { x: 50, y: 40 }, direction: 20, speed: 10 },
        { coords: { x: 50, y: 50 }, direction: 20, speed: 10 },
        { coords: { x: 60, y: 50 }, direction: 20, speed: 10 },
        { coords: { x: 60, y: 60 }, direction: 20, speed: 10 },
        { coords: { x: 70, y: 60 }, direction: 20, speed: 10 },
        { coords: { x: 70, y: 70 }, direction: 20, speed: 10 },
        { coords: { x: 80, y: 70 }, direction: 20, speed: 10 },
      ],
    },
  ];

  const animation: animationInfo =
    simulationResult_to_animationInfo(simulation);

  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="Board" data-testid="Board">
        {Animate((frame: number) => renderFrame(animation, frame))}
      </div>
    </div>
  );
}

export default Board;
