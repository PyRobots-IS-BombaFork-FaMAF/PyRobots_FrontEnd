import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRobot from "../features/newrobot/CreateRobot";

beforeEach(() => {
  render(
    <BrowserRouter>
      <CreateRobot />
    </BrowserRouter>
  );
});

describe("Compontente formulario de robot", () => {
  test("El contenedor del avatar está en el componente", () => {
    const avatarDiv = screen.getByTestId("avatarView");
    expect(avatarDiv).toBeInTheDocument();
  });
  test("La imagen de avatar para el robot está en el componente", () => {
    const avatarImg = screen.getByTestId("avatarImage");
    expect(avatarImg).toBeInTheDocument();
  });
  test("El botón para subir una foto está dentro de la componente", () => {
    const inputForAvatar = screen.getByTestId("robotAvatar");
    expect(inputForAvatar).toBeInTheDocument();
  });
  test("El imput para ingresar el nombre del robot está en el componente", () => {
    const inputForRobotName = screen.getByTestId("robotName");
    expect(inputForRobotName).toBeInTheDocument();
  });
  test("Se especifica al usuario el tipo de archivo de código aceptado", () => {
    const typeOfCode = screen.getByLabelText(/.py/i);
    expect(typeOfCode).toBeInTheDocument();
  });
  test("El imput para ingresar el código del robot está en la componente", () => {
    const imputForCode = screen.getByTestId("robotCode");
    expect(imputForCode).toBeInTheDocument();
  });
  test("El botón para enviar el formulario está en la componente", () => {
    const submitButton = screen.getByRole("button", { name: /Crear/i });
    expect(submitButton).toBeInTheDocument();
  });

});
