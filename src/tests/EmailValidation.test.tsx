import { render, screen } from "@testing-library/react";
import { BrowserRouter, Navigate } from "react-router-dom";
import swal from "sweetalert2";

import {
  ErrorPage,
  InvalidArgumentsPage,
  SuccessPage,
} from "../features/register/emailValidation";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
}));

describe("Email validation", () => {
  test("SuccessPage", () => {
    render(<SuccessPage res="Success" />, { wrapper: BrowserRouter });
    expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
    expect(swal.fire).toHaveBeenCalledWith({ title: "Success" });
  });

  test("ErrorPage", () => {
    render(<ErrorPage res="My massage" />, { wrapper: BrowserRouter });
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("My massage")).toBeInTheDocument();
  });

  test("InvalidArgumentsPage", () => {
    render(<InvalidArgumentsPage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Argumentos inválidos")).toBeInTheDocument();
  });
});
