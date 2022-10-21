import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Board, RobotInfo } from "../features/board/board";
import { gameToBoard_coordinates, boardConfig, gameCoords, boardCoords } from "../features/board/boardHelper";


describe("Componente Board", () => {

  test("El textfield 'Simulación' esta en el componente `Board`", () => {
    render(
      <BrowserRouter>
        <Board />
      </BrowserRouter>
    );
    const board: HTMLElement = screen.getByTestId("Board");
    expect(board).toBeInTheDocument();
    expect(board).toHaveTextContent("Simulación");
  });

  test("Componente `RobotInfo`", () => {
    render(
      <RobotInfo name="Robot de prueba" color="Red" />
    );
    const board: HTMLElement = screen.getByTestId("RobotInfo Robot de prueba");
    expect(board).toHaveTextContent("Robot de prueba");
    expect(board).toHaveTextContent("Vida: ");
  });

});


describe("funciones dentro del componente `Board`", () => {
  describe("Función `game_board_coords`", () => {

    const game_board_coords: { board: boardConfig, gameCoords: gameCoords, boardCoords: boardCoords }[] = [
      { board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 }, gameCoords: { x: 0, y: 0 }, boardCoords: { x: 0, y: 0 } },
      { board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 }, gameCoords: { x: 1000, y: 1000 }, boardCoords: { x: 1000, y: 1000 } },
      { board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 }, gameCoords: { x: -500, y: 500 }, boardCoords: { x: -500, y: 500 } },
      { board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 }, gameCoords: { x: 500, y: -500 }, boardCoords: { x: 500, y: -500 } },
      { board: { x0: 0, y0: 0, size: 1000, robotsSize: 0 }, gameCoords: { x: -1000, y: -500 }, boardCoords: { x: -1000, y: -500 } },

      { board: { x0: 0, y0: 0, size: 500, robotsSize: 0 }, gameCoords: { x: 0, y: 0 }, boardCoords: { x: 0, y: 0 } },
      { board: { x0: 0, y0: 0, size: 500, robotsSize: 0 }, gameCoords: { x: 1000, y: 500 }, boardCoords: { x: 500, y: 250 } },
      { board: { x0: 0, y0: 0, size: 500, robotsSize: 0 }, gameCoords: { x: -500, y: 250 }, boardCoords: { x: -250, y: 125 } },
      { board: { x0: 0, y0: 0, size: 500, robotsSize: 0 }, gameCoords: { x: 250, y: -125 }, boardCoords: { x: 125, y: -62.5 } },
      { board: { x0: 0, y0: 0, size: 500, robotsSize: 0 }, gameCoords: { x: -1000, y: -250 }, boardCoords: { x: -500, y: -125 } },

      { board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 }, gameCoords: { x: 0, y: 0 }, boardCoords: { x: 200, y: 300 } },
      { board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 }, gameCoords: { x: 1000, y: 1000 }, boardCoords: { x: 1200, y: 1300 } },
      { board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 }, gameCoords: { x: -500, y: 500 }, boardCoords: { x: -300, y: 800 } },
      { board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 }, gameCoords: { x: 500, y: -500 }, boardCoords: { x: 700, y: -200 } },
      { board: { x0: 200, y0: 300, size: 1000, robotsSize: 0 }, gameCoords: { x: -1000, y: -500 }, boardCoords: { x: -800, y: -200 } },

      { board: { x0: 200, y0: 300, size: 500, robotsSize: 0 }, gameCoords: { x: 0, y: 0 }, boardCoords: { x: 200, y: 300 } },
      { board: { x0: 200, y0: 300, size: 500, robotsSize: 0 }, gameCoords: { x: 1000, y: 500 }, boardCoords: { x: 700, y: 550 } },
      { board: { x0: 200, y0: 300, size: 500, robotsSize: 0 }, gameCoords: { x: -500, y: 250 }, boardCoords: { x: -50, y: 425 } },
      { board: { x0: 200, y0: 300, size: 500, robotsSize: 0 }, gameCoords: { x: 250, y: -125 }, boardCoords: { x: 325, y: 237.5 } },
      { board: { x0: 200, y0: 300, size: 500, robotsSize: 0 }, gameCoords: { x: -1000, y: -250 }, boardCoords: { x: -300, y: 175 } }
    ];

    test("Valores de retorno", () => {
      const result: { expected: boardCoords, got: boardCoords }[]
        = game_board_coords.map(({ board, gameCoords, boardCoords }) => {
          return { expected: boardCoords, got: gameToBoard_coordinates(board, gameCoords) }
        });

      result.forEach(({ expected, got }) => {
        expect(got).toEqual(expected);
      });
    });

  })
})
