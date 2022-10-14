import { render, screen } from "@testing-library/react";
import SignIn from "../features/login/SignIn";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";



afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

describe("Componente SignIn", () => {
  let user: HTMLElement, pass: HTMLElement;
  test("El textfield username esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>
    );
    user = screen.getByTestId(/^user/i);
    expect(user).toBeInTheDocument();
  });

  test("El textfield password esta en el componente", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </BrowserRouter>
    );
    pass = screen.getByLabelText(/^Password/i);
    expect(pass).toBeInTheDocument();
  });
});
