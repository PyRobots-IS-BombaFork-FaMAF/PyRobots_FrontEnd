import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Container } from "@mui/system";
import {
  ListMatchesFilter,
  ListMatch,
  Match,
  listMatchesApi,
} from "./ListMatchesApi";
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
import { useEffect, useState } from "react";
import { ItemMatch } from "./ItemMatch";

function callApiList(
  filters: ListMatchesFilter,
  setMatches: Function,
  setIsReady: Function
) {
  const promise1 = Promise.resolve(
    listMatchesApi(filters, localStorage.getItem("access_token")?.toString()!)
  );
  promise1.then((value) => {
    setMatches(value);
    setIsReady(true);
  });
}
export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (isReady) {
      callApiList({}, setMatches, setIsReady);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const check = JSON.parse(
      JSON.stringify(Object.fromEntries(data)),
      (key, value) => (value === null || value === "" ? undefined : value)
    );

    if (
      data.get("game_name")?.toString().length! >= 3 ||
      data.get("game_name")?.toString()! === ""
    ) {
      callApiList(check, setMatches, setIsReady);
      const promise1 = Promise.resolve(
        listMatchesApi(check, localStorage.getItem("access_token")?.toString()!)
      );
      promise1.then((value) => {
        setMatches(value);
        setIsReady(true);
      });
    }
  };

  const theme = createTheme();

  return (
    <div>
      <NavBar />
      <div className="bg-image-list">
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
                sx={{ mt: 20, mpl: 2 }}
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
          <Container maxWidth="xs" sx={{ mr: 65, mt: -20 }}>
            <Box
              sx={{
                width: "200%",
                maxWidth: 1100,
                bgcolor: "background.paper",
                marginTop: 30,
                marginRight: 80,
              }}
            >
              {isReady ? (
                <List>
                  {matches.map((elem: Match, key: number) => {
                    return (
                      <div key={key}>
                        <ItemMatch myKey={key} match={elem} />
                        <Divider />
                        <Divider />
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              ) : (
                <div></div>
              )}
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
