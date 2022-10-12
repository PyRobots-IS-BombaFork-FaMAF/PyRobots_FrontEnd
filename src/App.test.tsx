import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders 'User Name' text", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const app = screen.getByLabelText(/^User Name/i);
  expect(app).toBeInTheDocument();
});
