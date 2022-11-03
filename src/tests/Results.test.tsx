import { render, screen } from "@testing-library/react";
import { CardDraw, CardLose, CardWin } from "../features/results/results";

describe("Cartas de resultados", () => {
  test("El texto de ganaste está se renderiza en CardWin", () => {
    render(<CardWin />);
    const nombre = screen.getByTestId("text-win");
    expect(nombre).toBeInTheDocument();
  });
  test("El texto de ganaste está se renderiza en CardDraw", () => {
    render(<CardDraw />);
    const nombre = screen.getByTestId("text-draw");
    expect(nombre).toBeInTheDocument();
  });
  test("El texto de ganaste está se renderiza en CardLose", () => {
    render(<CardLose />);
    const nombre = screen.getByTestId("text-lose");
    expect(nombre).toBeInTheDocument();
  });
  test("Se muestra el texto de robot dentro de la CardLose", () => {
    render(<CardLose />);
    const robotTag = screen.getByText(/Robot/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de robot dentro de la CardDraw", () => {
    render(<CardDraw />);
    const robotTag = screen.getByText(/Robot/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de robot dentro de la CardWin", () => {
    render(<CardWin />);
    const robotTag = screen.getByText(/Robot/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Nombre de partida dentro de la CardLose", () => {
    render(<CardLose />);
    const robotTag = screen.getByText(/Nombre de partida/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Nombre de partida dentro de la CardDraw", () => {
    render(<CardDraw />);
    const robotTag = screen.getByText(/Nombre de partida/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Nombre de partida dentro de la CardWin", () => {
    render(<CardWin />);
    const robotTag = screen.getByText(/Nombre de partida/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Fecha de creación dentro de la CardLose", () => {
    render(<CardLose />);
    const robotTag = screen.getByText(/Fecha de creación/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Fecha de creación dentro de la CardDraw", () => {
    render(<CardDraw />);
    const robotTag = screen.getByText(/Fecha de creación/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el texto de Fecha de creación dentro de la CardWin", () => {
    render(<CardWin />);
    const robotTag = screen.getByText(/Fecha de creación/i);
    expect(robotTag).toBeInTheDocument();
  });
  test("Se muestra el nombre de robot pasado como prop en CardLose", () => {
    render(
      <CardLose
        index={0}
        setIdStats={0}
        robotName="Roboto"
        gameDate=""
        gameName=""
      />
    );
    const robotName = screen.getByText('Roboto');
    expect(robotName).toBeInTheDocument();
  });
  test("Se muestra el nombre de robot pasado como prop en CardWin" , () => {
    render(
      <CardWin
        index={0}
        setIdStats={0}
        robotName="Roboto"
        gameDate=""
        gameName=""
      />
    );
    const robotName = screen.getByText('Roboto');
    expect(robotName).toBeInTheDocument();
  });
  test("Se muestra el nombre de robot pasado como prop en CardDraw" , () => {
    render(
      <CardDraw
        index={0}
        setIdStats={0}
        robotName="Roboto"
        gameDate=""
        gameName=""
      />
    );
    const robotName = screen.getByText('Roboto');
    expect(robotName).toBeInTheDocument();
  });
  test("Se muestra el nombre de partida pasado como prop en CardLose", () => {
    render(
      <CardLose
        index={0}
        setIdStats={0}
        robotName=""
        gameDate=""
        gameName="assdasda"
      />
    );
    const robotName = screen.getByText('assdasda');
    expect(robotName).toBeInTheDocument();
  });
  test("Se muestra el nombre de partida pasado como prop en CardWin" , () => {
    render(
      <CardWin
        index={0}
        setIdStats={0}
        robotName=""
        gameDate=""
        gameName="assdasda"
      />
    );
    const robotName = screen.getByText('assdasda');
    expect(robotName).toBeInTheDocument();
  });
  test("Se muestra el nombre de partida pasado como prop en CardDraw" , () => {
    render(
      <CardDraw
        index={0}
        setIdStats={0}
        robotName=""
        gameDate=""
        gameName="assdasda"
      />
    );
    const robotName = screen.getByText('assdasda');
    expect(robotName).toBeInTheDocument();
  });
});
