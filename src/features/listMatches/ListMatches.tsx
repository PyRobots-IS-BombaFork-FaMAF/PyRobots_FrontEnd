import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Container } from "@mui/system";
import { listMatchesApi } from "./ListMatchesApi";
import {
  Button,
  Checkbox,
  CssBaseline,
  Divider,
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
  const [matches, setMatches] = useState<any>([{ }]);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const check = JSON.parse(JSON.stringify(Object.fromEntries(data)),
      (key, value) => value === null || value === '' ? undefined : value);
    const promise1 = Promise.resolve(listMatchesApi(check, localStorage.getItem("access_token")?.toString()!));
    promise1.then((value) => {
      setMatches(value);
      setIsReady(true);
    })
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
                  name="game_name"
                  fullWidth
                  data-testid="filterByName"
                  id="filterByName"
                  label="Filtrar por nombre"
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
                        name="create_by_user"
                        data-testid="createrByUser"
                      />
                    }
                    label={
                      <Typography color="white" fontSize="12">
                        Mis partidas
                      </Typography>
                    }
                    sx={{ mr: 40 }}
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
                        name="only_private"
                        data-testid="onlyPrivate"
                      />
                    }
                    label={
                      <Typography color="white" fontSize="12">
                        Privado
                      </Typography>
                    }
                    sx={{ mr: 40 }}
                  />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  data-testid="submit"
                  sx={{ maxWidth: 800, mt: 3, mb: 2 }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Container>
          <Container maxWidth="xs" sx={{mr: 150, mt: -20}}>
            <Box
              sx={{
                width: "300%",
                maxWidth: 1500,
                bgcolor: "background.paper",
                marginTop: 30,
                marginRight: 90,
              }}
            >
              {
              
              isReady ?
              ( <List>
                {
                  matches.map((elem : any, key : number) => {
                    return (
                    <div key={key}>
                      <ItemMatch
                        myKey = {key}
                        _name = {elem._name}
                        _rounds = {elem._rounds}
                        _games = {elem._games}
                        _max_players = {elem._max_players}
                        _is_private = {elem._password !== ""}
                        
                      />
                      <Divider/>
                      <Divider/>
                      <Divider/>
                    </div>
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
