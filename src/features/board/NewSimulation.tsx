import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NavBar from "../directories/NavBar";
import {
  newSimulationAPI,
  newSimulationInfo,
  simulationResult,
} from "./SimulationAPI";
import { useState } from "react";
import Board from "./board";

function onSubmit_newSimulation(
  setSimulationResult: React.Dispatch<
    React.SetStateAction<simulationResult | null>
  >,
  event: React.FormEvent<HTMLFormElement>
): void {
  event.preventDefault();
  const data: FormData = new FormData(event.currentTarget);

  // pattern guarantees that all formats are correct

  const newSimulationInfo: newSimulationInfo = {
    amount_rounds: 1000,
    robot1_id: 0,
    robot2_id: 0,
  };

  const rounds = data.get("rounds-amount");
  if (typeof rounds === "string") {
    newSimulationInfo.amount_rounds = parseInt(rounds);
  }

  const access_token: string | null = localStorage.getItem("access_token");
  const simulationResult: Promise<simulationResult> = newSimulationAPI(
    newSimulationInfo,
    access_token
  );

  simulationResult.then((result) => {
    setSimulationResult(result);
  });
}

// Regex of input validation (in string because `pattern` requires a string)
export const rounds_amount_regex: string = "^([1-9][0-9]{0,3}|10000)$";

function SimulationForm(
  setSimulationResult: React.Dispatch<
    React.SetStateAction<simulationResult | null>
  >
): JSX.Element {
  return (
    <Container>
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          onSubmit_newSimulation(setSimulationResult, event);
        }}
      >
        <Grid>
          <TextField
            required
            name="rounds-amount"
            label="Cantidad de rondas"
            variant="standard"
            helperText="Entre 1 y 10000"
            defaultValue="10000"
            data-testid="rounds-amount"
            type="text"
            inputProps={{ maxLength: 5, pattern: rounds_amount_regex }}
            sx={{ backgroundColor: "#f2f2f2" }}
          />
        </Grid>
        <Button
          type="submit"
          role="button"
          variant="contained"
          data-testid="submit"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#43B647",
            "&:hover": {
              backgroundColor: "#43B647",
              boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
            },
          }}
        >
          Nueva simulación
        </Button>
      </Box>
    </Container>
  );
}

function NewSimulation(): JSX.Element {
  const [simulationResult, setSimulationResult] =
    useState<simulationResult | null>(null);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {simulationResult === null ? (
        <div className="bg-image">
          <div className="form">
            <h1>Nueva simulación</h1>
            {SimulationForm(setSimulationResult)}
          </div>
        </div>
      ) : (
        Board(simulationResult)
      )}
    </div>
  );
}

export default NewSimulation;
