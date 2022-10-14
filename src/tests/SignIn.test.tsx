import { render, screen } from "@testing-library/react";
import SignIn from "../features/login/SignIn";
import React from "react";

describe("Componente SignIn", () => {
    let user: HTMLElement,
      pass: HTMLElement;
    test("El textfield username esta en el componente", () => {
      render(
        <SignIn />
      );
      user = screen.getByLabelText(/^User Name/i);
      expect(user).toBeInTheDocument();
    });
  
    test("El textfield password esta en el componente", () => {
      render(
        <SignIn />
      );
      pass = screen.getByLabelText(/^Password/i);
      expect(pass).toBeInTheDocument();
    });


  });