import ListMatches from "../features/listMatches/ListMatches";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


describe("Componente ListMatches", () => {
    test("El Text field para filtrar por nombre esta en el componente", () => {
      render(
        <BrowserRouter>
          <ListMatches/>
        </BrowserRouter>  
      );
      const filterByName = screen.getByTestId("filterByName");
      expect(filterByName).toBeInTheDocument();
    });
  
    test("El checkbox para filtrar por partidas creadas por el usuario esta en el componente", () => {
        render(
          <BrowserRouter>
            <ListMatches/>
          </BrowserRouter>  
        );
        const createrByUser = screen.getByTestId("createrByUser");
        expect(createrByUser).toBeInTheDocument();
      });
  
    test("El checkbox para filtrar por partida privadas esta en el componente", () => {
        render(
          <BrowserRouter>
            <ListMatches/>
          </BrowserRouter>
        );
        const onlyPrivate = screen.getByTestId("onlyPrivate");
        expect(onlyPrivate).toBeInTheDocument();
      });
  
      test("El boton submit esta en el componente", () => {
        render(
          <BrowserRouter>
            <ListMatches/>
          </BrowserRouter>
        );
        const submit = screen.getByTestId("submit");
        expect(submit).toBeInTheDocument();
      });  
  });