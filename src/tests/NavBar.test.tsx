import NavBar from "../features/directories/NavBar";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Componente SignIn", () => {
  test("El boton crear robot esta en el componente", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const crearRobot = screen.getByTestId("crearRobot");
    expect(crearRobot).toBeInTheDocument();
  });

  test("El boton ejecutar simulacion esta en el componente", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const ejecutarSim = screen.getByTestId("ejecutarSim");
    expect(ejecutarSim).toBeInTheDocument();
  });

  test("El boton crear partida esta en el componente", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const crearPartida = screen.getByTestId("crearPartida");
    expect(crearPartida).toBeInTheDocument();
  });

  test("El boton listarPartida esta en el componente", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const listarPartida = screen.getByTestId("listarPartidas");
    expect(listarPartida).toBeInTheDocument();
  });
  test("El boton logOut esta en el componente", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const logOut = screen.getByTestId("logOut");
    expect(logOut).toBeInTheDocument();
  });
});
