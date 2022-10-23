import { render, screen } from "@testing-library/react";
import { RobotInfo, renderFrame } from "../features/board/board";
import {
  gameToBoard_coordinates,
  boardConfig,
  gameCoords,
  boardCoords,
  animationInfo,
  simulationResult_to_animationInfo,
} from "../features/board/boardHelper";
import { simulationResult } from "../features/board/SimulationAPI";

describe("Componente Board", () => {
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

  test("El textfield 'Simulación' esta en el componente `renderFrame`", () => {
    render(renderFrame(animation, 0));
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
  });

  test("Componente `RobotInfo`", () => {
    render(<RobotInfo name="Robot de prueba" color="Red" />);
    const board: HTMLElement = screen.getByTestId("RobotInfo Robot de prueba");
    expect(board).toHaveTextContent("Robot de prueba");
    expect(board).toHaveTextContent("Vida: ");
  });
});

describe("Funciones dentro del componente `Board`", () => {
  describe("Función `gameToBoard_coordinates`", () => {
    const game_board_coords: {
      board: boardConfig;
      gameCoords: gameCoords;
      boardCoords: boardCoords;
    }[] = [
      {
        board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 0, y: 0 },
      },
      {
        board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 },
        gameCoords: { x: 1000, y: 1000 },
        boardCoords: { x: 1000, y: 1000 },
      },
      {
        board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 },
        gameCoords: { x: -500, y: 500 },
        boardCoords: { x: -500, y: 500 },
      },
      {
        board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 },
        gameCoords: { x: 500, y: -500 },
        boardCoords: { x: 500, y: -500 },
      },
      {
        board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 },
        gameCoords: { x: -1000, y: -500 },
        boardCoords: { x: -1000, y: -500 },
      },

      {
        board: { x0: 0, y0: 0, size: 500, robotsSize: 0 },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 0, y: 0 },
      },
      {
        board: { x0: 0, y0: 0, size: 500, robotsSize: 0 },
        gameCoords: { x: 1000, y: 500 },
        boardCoords: { x: 500, y: 250 },
      },
      {
        board: { x0: 0, y0: 0, size: 500, robotsSize: 0 },
        gameCoords: { x: -500, y: 250 },
        boardCoords: { x: -250, y: 125 },
      },
      {
        board: { x0: 0, y0: 0, size: 500, robotsSize: 0 },
        gameCoords: { x: 250, y: -125 },
        boardCoords: { x: 125, y: -62.5 },
      },
      {
        board: { x0: 0, y0: 0, size: 500, robotsSize: 0 },
        gameCoords: { x: -1000, y: -250 },
        boardCoords: { x: -500, y: -125 },
      },

      {
        board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 200, y: 300 },
      },
      {
        board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 },
        gameCoords: { x: 1000, y: 1000 },
        boardCoords: { x: 1200, y: 1300 },
      },
      {
        board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 },
        gameCoords: { x: -500, y: 500 },
        boardCoords: { x: -300, y: 800 },
      },
      {
        board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 },
        gameCoords: { x: 500, y: -500 },
        boardCoords: { x: 700, y: -200 },
      },
      {
        board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 },
        gameCoords: { x: -1000, y: -500 },
        boardCoords: { x: -800, y: -200 },
      },

      {
        board: { x0: 200, y0: 300, size: 500, robotsSize: 0 },
        gameCoords: { x: 0, y: 0 },
        boardCoords: { x: 200, y: 300 },
      },
      {
        board: { x0: 200, y0: 300, size: 500, robotsSize: 0 },
        gameCoords: { x: 1000, y: 500 },
        boardCoords: { x: 700, y: 550 },
      },
      {
        board: { x0: 200, y0: 300, size: 500, robotsSize: 0 },
        gameCoords: { x: -500, y: 250 },
        boardCoords: { x: -50, y: 425 },
      },
      {
        board: { x0: 200, y0: 300, size: 500, robotsSize: 0 },
        gameCoords: { x: 250, y: -125 },
        boardCoords: { x: 325, y: 237.5 },
      },
      {
        board: { x0: 200, y0: 300, size: 500, robotsSize: 0 },
        gameCoords: { x: -1000, y: -250 },
        boardCoords: { x: -300, y: 175 },
      },
    ];

    test("Valores de retorno", () => {
      const result: { expected: boardCoords; got: boardCoords }[] =
        game_board_coords.map(({ board, gameCoords, boardCoords }) => {
          return {
            expected: boardCoords,
            got: gameToBoard_coordinates(board, gameCoords),
          };
        });

      result.forEach(({ expected, got }) => {
        expect(got).toEqual(expected);
      });
    });
  });
});
