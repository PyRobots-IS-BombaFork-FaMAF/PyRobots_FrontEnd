import { render, screen } from "@testing-library/react";
import {
  isValidEmail,
  isValidUserName,
  isValidPassword,
} from "../features/register/SignUpUtils";
import SignUp from "../features/register/SignUp";
import { store } from "../app/store";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";

describe("funciones dentro del componente SignUp", () => {
  describe("isValidUserName", () => {
    test("Debe retornar un booleano", () => {
      const result = isValidUserName("SoyUnUser");
      expect(typeof result).toBe("boolean");
    });

    test("Debe retornar true si el tamaño del string es menor a 12 y contiene caracteres especiales", () => {
      const result = isValidUserName("SoyUn_User");
      expect(result).toBeTruthy();
    });

    test("Debe retornar false si el tamaño del string es mayor a 22", () => {
      const result = isValidUserName(
        "SoyUnUserconunacadenadecaracteresmuylargaytediosanosesillegea22perosigoescribiendoporlasdudas"
      );
      expect(result).toBeFalsy();
    });

    test("Debe retornar true si comienza con caracteres especiales", () => {
      const result = isValidUserName("_SoyunUser");
      expect(result).toBeTruthy();
    });

    test("Debe retornar false si tiene menos de 6 caracteres", () => {
      const result = isValidUserName("unUse");
      expect(result).toBeFalsy();
    });
  });
  describe("isValidEmail", () => {
    test("Debe retornar un booleano", () => {
      const result = isValidEmail("email@example.com");
      expect(typeof result).toBe("boolean");
    });

    test("Debe retornar true si tiene el formato email@example.com", () => {
      const result = isValidEmail("email@example.com");
      expect(result).toBeTruthy();
    });

    test("Debe retornar false si no tiene @", () => {
      const result = isValidEmail("emailexample.com");
      expect(result).toBeFalsy();
    });

    test("Debe retornar false si no tiene el sufijo", () => {
      const result = isValidEmail("email@example");
      expect(result).toBeFalsy();
    });

    test("Debe retornar true si usa puntos", () => {
      const result = isValidEmail("email.something@example.com");
      expect(result).toBeTruthy();
    });
  });
  describe("isValidPassword", () => {
    test("Debe retornar un booleano", () => {
      const result = isValidPassword("Password123!");
      expect(typeof result).toBe("boolean");
    });

    test("Debe retornar true si tiene al menos 8 caracteres, 1 mayuscula, 1 miniscula, un caracter y un numero", () => {
      const result = isValidPassword("Password123!");
      expect(result).toBeTruthy();
    });
    test("Debe retornar true si no tiene simbolos", () => {
      const result = isValidPassword("Passoword123");
      expect(result).toBeTruthy();
    });

    test("Debe retornar false si no tiene mayusculas", () => {
      const result = isValidPassword("password123!");
      expect(result).toBeFalsy();
    });

    test("Debe retornar false si no tiene minusculas", () => {
      const result = isValidPassword("PASSWORD123!");
      expect(result).toBeFalsy();
    });
    test("Debe retornar false si no tiene numeros", () => {
      const result = isValidPassword("Passoword!");
      expect(result).toBeFalsy();
    });
    test("Debe retornar false si tiene menos de 8 caracteres", () => {
      const result = isValidPassword("Pas123!");
      expect(result).toBeFalsy();
    });
  });
});

describe("Componente SignUp", () => {
  let user: HTMLElement,
    email: HTMLElement,
    pass: HTMLElement,
    avatar: HTMLElement;
  test("El textfield username esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </BrowserRouter>
    );
    user = screen.getByLabelText(/^User Name/i);
    expect(user).toBeInTheDocument();
  });

  test("El textfield password esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </BrowserRouter>
    );
    pass = screen.getByLabelText(/^Password/i);
    expect(pass).toBeInTheDocument();
  });

  test("El textfield email esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </BrowserRouter>
    );
    email = screen.getByLabelText(/^Email Address/i);
    expect(email).toBeInTheDocument();
  });

  test("El Input avatar esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUp />
        </Provider>
      </BrowserRouter>
    );
    avatar = screen.getByTitle(/^avatar/i);
    expect(avatar).toBeInTheDocument();
  });
});