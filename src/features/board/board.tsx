import { Stage, Layer, Rect, Circle, Group, Line } from "react-konva";

import {
  boardConfig,
  gameCoords,
  robotInFrameConfig,
  gameToBoard_coordinates,
  animationInfo,
  robotInAnimationInfo,
  robotInSideTextConfig,
  simulationResult_to_animationInfo,
  missilInFrameConfig,
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
      width={board.size_in_screen}
      height={board.size_in_screen}
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

function Robots({
  board,
  robots,
}: {
  board: boardConfig;
  robots: robotInFrameConfig[];
}): JSX.Element {
  return (
    <Group>
      {robots.map((robot: robotInFrameConfig, key: number) => (
        <Group key={key}>
          <Robot board={board} robotConfig={robot} />
        </Group>
      ))}
    </Group>
  );
}

/* Draws a missil as a strait line */
function Missil({
  board,
  missilConfig,
}: {
  board: boardConfig;
  missilConfig: missilInFrameConfig;
}): JSX.Element {
  const missil_board: gameCoords = gameToBoard_coordinates(
    board,
    missilConfig.coords
  );

  const x_component_direction: number = Math.cos(
    (missilConfig.direction * Math.PI) / 180
  );
  const y_component_direction: number = Math.sin(
    (missilConfig.direction * Math.PI) / 180
  );

  const missil_size: number = (board.robotsSize * 3) / 4;

  return (
    <Line
      points={[
        missil_board.x - (missil_size / 2) * x_component_direction,
        missil_board.y - (missil_size / 2) * y_component_direction,
        missil_board.x + (missil_size / 2) * x_component_direction,
        missil_board.y + (missil_size / 2) * y_component_direction,
      ]}
      stroke={missilConfig.color}
      strokeWidth={missil_size / 2}
      lineCap="round"
    />
  );
}

function Missils({
  board,
  missils,
}: {
  board: boardConfig;
  missils: missilInFrameConfig[];
}): JSX.Element {
  return (
    <Group>
      {missils.map((missil: missilInFrameConfig, key: number) => (
        <Group key={key}>
          <Missil board={board} missilConfig={missil} />
        </Group>
      ))}
    </Group>
  );
}

function MainBoard({
  board_size,
  robots,
  missils,
}: {
  board_size: number;
  robots: robotInFrameConfig[];
  missils: missilInFrameConfig[];
}): JSX.Element {
  const robot_size_relative: number = 0.02;
  const window_min_size: number = Math.min(
    window.innerWidth,
    window.innerHeight
  );
  const margin_percentage: number = 0.025;
  const margin: number = window_min_size * margin_percentage;

  const board: boardConfig = {
    board_size: board_size,
    x0: window_min_size * margin_percentage,
    y0: window_min_size * margin_percentage,
    size_in_screen: window_min_size - 2 * margin,
    robotsSize: robot_size_relative * window_min_size,
  };

  return (
    <Stage width={window_min_size} height={window_min_size}>
      <Layer>
        <BackGround {...board} />
        <Robots board={board} robots={robots} />
        <Missils board={board} missils={missils} />
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
        life: 1 - (robot.rounds[frame]?.damage ?? 1),
      };
    }
  );

  return (
    <div className="Board" data-testid="Board">
      <div className="MainBoard">
        <MainBoard
          board_size={animation.board_size}
          robots={robotsInGame}
          missils={animation.missils[frame]}
        />
      </div>
      <div className="SideText">
        <SideText robots={robotsInSideText} />
      </div>
    </div>
  );
}

export function Board(): JSX.Element {
  const simulation: simulationResult = {
    board_size: 1000,
    missil_velocity: 4,
    robots: [
      {
        name: "Robot 1",
        rounds: [
          { coords: { x: 0, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 0 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 10, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 10 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 20, y: 20 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 30, y: 20 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 30, y: 30 }, direction: 20, speed: 10, damage: 0 },
          {
            coords: { x: 40, y: 30 },
            direction: 20,
            speed: 10,
            damage: 0,
            missil: { direction: 135, distance: 60 },
          },
          { coords: { x: 40, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 40 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 50, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 50 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 60, y: 60 }, direction: 20, speed: 10, damage: 0 },
          { coords: { x: 70, y: 60 }, direction: 20, speed: 10, damage: 0.5 },
          { coords: { x: 70, y: 70 }, direction: 20, speed: 10, damage: 0.5 },
          { coords: { x: 80, y: 70 }, direction: 20, speed: 10, damage: 0.5 },
        ],
      },
    ],
  };

  const animation: animationInfo =
    simulationResult_to_animationInfo(simulation);

  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="Board" data-testid="Board">
        {Animate(animation.rounds_amount - 1, (frame: number) =>
          renderFrame(animation, frame)
        )}
      </div>
    </div>
  );
}

export default Board;
