import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRobot from "../features/newrobot/CreateRobot";
import { isValidRobotName } from "../features/newrobot/CreateRobotUtils";

beforeEach(() => {
  render(
    <BrowserRouter>
      <CreateRobot />
    </BrowserRouter>
  );
});

describe("Funciones dentro del componente", () => {
  describe("isValidRobotName", () => {
    test("Debe devolver verdadero con un nombre con formato correcto", () => {
      const result = isValidRobotName("NombreRobot");
      expect(typeof result).toBeTruthy();
    });
    test("Debe devolver falso, dado un nombre de robot muy largo", () => {
      const result = isValidRobotName("NombredelRobot12");
      expect(result).toBeFalsy();
    });
    test("Debe devolver falso, dado un nombre de robot muy corto", () => {
      const result = isValidRobotName("no");
      expect(result).toBeFalsy();
    });
    test("Debe devolver falso, dado un nombre de robot vacío", () => {
      const result = isValidRobotName("");
      expect(result).toBeFalsy();
    });
  });
});

describe("Requerimientos del componente", () => {
  test("El nombre del robot debe ser obligatorio", () => {
    const inputName = screen.getByRole("textbox", {
      name: "Nombre del Robot",
    });
    expect(inputName).toBeRequired();
  });

  test("El archivo .py del robot debe ser obligatorio", () => {
    const inputFile = screen.getByTestId("robotCode");
    expect(inputFile).toBeRequired();
  });
});

describe("Estado inicial del formulario", () => {
  test("El avatar posee la imagen por defecto", () => {
    const avatar = screen.getByAltText(
      "Avatar del robot"
    ) as HTMLImageElement | null;
    expect(avatar?.src).toContain("https://robohash.org/user1");
  });

  test("No debe haber una archivo para la imagen de avatar precargado", () => {
    const inputFile = screen.getByTestId("robotAvatar");
    expect(inputFile).toHaveValue("");
  })

  test("El nombre del robot está vacío", () => {
    const inputName = screen.getByRole("textbox", {
      name: "Nombre del Robot",
    });
    expect(inputName).toHaveValue("");
  });

  test("No debe haber un archivo .py precargado", () => {
    const inputFile = screen.getByTestId("robotCode");
    expect(inputFile).toHaveValue("");
  })
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
  test("El boton subir el robot está en el componente", () => {
    const submit = screen.getByTestId("submit-robot");
    expect(submit).toBeInTheDocument();
  });
});
