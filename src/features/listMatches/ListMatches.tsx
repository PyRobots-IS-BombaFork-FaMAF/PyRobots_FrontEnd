import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import {
  ListMatchesFilter,
  ListMatch,
  listMatchesApi,
} from "./ListMatchesApi";
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
import { useEffect, useState } from "react";

import { DataGrid, GridColDef} from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    editable: false,
  },
  {
    field: '_name',
    headerName: 'Nombre',
    width: 200,
    editable: false,
  },
  {
    field: '_rounds',
    headerName: 'Rondas',
    type: 'number',
    width: 200,
    editable: false,
  },
  {
    field: '_games',
    headerName: 'Juegos',
    type: 'number',
    width: 200,
    editable: false,
  },
  {
    field: '_max_players',
    headerName: 'Maxima Cantidad Jugadores',
    width: 200,
    editable: false,
  },
  {
    field: '_min_players',
    headerName: 'Minima Cantidad Jugadores',
    width: 200,
    editable: false,
  },
  {
    field: '_private',
    headerName: 'Privado',
    width: 200,
  },
];

function callApiList(
  filters: ListMatchesFilter,
  setMatches: Function,
  setIsReady: Function
): void {
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
    }
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
                sx={{
                  mt: 20,
                  mpl: 2,
                  backgroundColor: "#f2f2f2",
                  padding: 5,
                  mb: 10,
                  borderRadius: "5%",
                }}
              >
                <h1>Listar Partidas</h1>
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
                        color: "black",
                        "&.Mui-checked": { color: "green" },
                      }}
                      name="create_by_user"
                      data-testid="createrByUser"
                    />
                  }
                  label={
                    <Typography color="black" fontSize="12">
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
                        color: "black",
                        "&.Mui-checked": { color: "green" },
                      }}
                      name="only_private"
                      data-testid="onlyPrivate"
                    />
                  }
                  label={
                    <Typography color="black" fontSize="12">
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
                  sx={{
                    maxWidth: 800,
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#43B647",
                    "&:hover": { backgroundColor: "#43B647", boxShadow: "0rem 0.1rem 0.5rem #0d8f11" }
                  }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Container>
              {isReady ? ( matches.length > 0 ? ( 
                <Box sx={{ height: "50vh", width: "100vw", maxWidth: "100vw", bgcolor: "background.paper",}}>
                <DataGrid
                  rows={matches.map((elem, index) => ({
                    id: index,
                    _name : elem._name,
                    _rounds : elem._rounds,
                    _games : elem._games,
                    _max_players: elem._max_players,
                    _min_players : elem._min_players,
                    _private : elem._private
                  }))}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>) : (
                <div></div>
              )) : 
                <div></div>
              }
        </ThemeProvider>
      </div>
    </div>
  );
}
