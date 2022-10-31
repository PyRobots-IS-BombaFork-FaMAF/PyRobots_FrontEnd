import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NavBar from "../directories/NavBar";
import { newSimulationAPI, newSimulationInfo } from "./SimulationAPI";

function onSubmit_newSimulation(event: React.FormEvent<HTMLFormElement>): void {
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
  newSimulationAPI(newSimulationInfo, access_token);

  // TODO: Do something with the response
}

// Regex of input validation (in string because `pattern` requires a string)
export const rounds_amount_regex: string = "^([1-9][0-9]{0,3}|10000)$";

function SimulationForm(): JSX.Element {
  return (
    <Container>
      <Box component="form" onSubmit={onSubmit_newSimulation}>
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
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="bg-image"></div>
      <div className="form">
        <h1>Nueva simulación</h1>
        <SimulationForm />
      </div>
    </div>
  );
}

export default NewSimulation;
