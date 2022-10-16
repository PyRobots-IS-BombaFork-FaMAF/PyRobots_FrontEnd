import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Container } from "@mui/system";
import { listMatchesApi } from "./ListMatchesApi";
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../directories/NavBar";
import "../directories/Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ItemMatch } from "./ItemMatch";


export default function ListMatches() {  
  const [matches, setMatches] = useState<any>([{}]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log(matches);
  };

  const theme = createTheme();

  return (
    <div>
      <NavBar />
      <div className="bg-image">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginRight: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 40, mpl: 2 }}
              >
                <TextField
                  sx={{ maxWidth: 800 }}
                  autoComplete="Filtrar por nombre"
                  name="filterByName"
                  fullWidth
                  data-testid="filterByName"
                  id="filterByName"
                  label="Filtrar por nombre"
                />
                <TextField
                  sx={{ maxWidth: 800 }}
                  autoComplete="Filtrar por fecha"
                  name="filterByDate"
                  fullWidth
                  data-testid="filterByDate"
                  id="filterByDate"
                  label="Filtrar por fecha"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      sx={{
                        color: "white",
                        "&.Mui-checked": { color: "white" },
                      }}
                      name="onlyPrivate"
                    />
                  }
                  label={
                    <Typography color="white" fontSize="12">
                      Private
                    </Typography>
                  }
                  sx={{ mr: 40 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ maxWidth: 800, mt: 3, mb: 2 }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Container>
          <Container maxWidth="xs">
            <Box
              sx={{
                width: "180%",
                maxWidth: 1000,
                bgcolor: "background.paper",
                marginTop: 30,
                marginRight: 70,
              }}
            >
              {
              matches?.name !== undefined ? 
              ( <List>
                {
                  matches.map((elem : any, key : number) => {
                    return (<ItemMatch
                      myKey = {key}
                      name = {elem.name}
                      rounds = {elem.rounds}
                      games = {elem.games}
                      max_players = {elem.max_players}
                      is_private = {elem.password !== ""}
                    />
                  )})
                }
                </List>) : <div></div>
              }
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
