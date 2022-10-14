import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders loading-spin ID" , () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const app = screen.getByTestId("loading-spin");
  expect(app).toBeInTheDocument();
});
