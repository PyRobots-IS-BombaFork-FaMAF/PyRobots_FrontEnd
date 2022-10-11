import { render, screen } from "@testing-library/react";
import Board from "../features/board/board";


describe("Componente Board", () => {
  test("El textfield 'Simulación' esta en el componente", () => {
    render(
      <Board />
    );
    const user: HTMLElement = screen.getByText("Simulación");
    expect(user).toBeInTheDocument();
  });
});
