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
  CssBaseline,
} from "@mui/material";
import NavBar from "../directories/NavBar";
import "../directories/Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {GridToolbarFilterButton, GridToolbarContainer, DataGrid, GridColDef} from '@mui/x-data-grid';

function CustomToolBar() : JSX.Element  {
  return(<GridToolbarContainer>
    <GridToolbarFilterButton/>
    <Button
        type="submit"
        fullWidth
        form='my-form'
        variant="contained"
        data-testid="submit"
        sx={{
          maxWidth: 100,
          mt: 2,
          mb: 2,
          ml: 2,
          backgroundColor: "#43B647",
          "&:hover": { backgroundColor: "#43B647", boxShadow: "0rem 0.1rem 0.5rem #0d8f11" }
        }}        
    >
            Refresh
    </Button>
  </GridToolbarContainer>);
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hide: true,
  },
  {
    field: '_name',
    headerName: 'Nombre',
    headerClassName: "columnClass",
    width: 200,
    editable: false,
  },
  {
    field: '_rounds',
    headerName: 'Rondas',
    headerClassName: "columnClass",
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: '_games',
    headerName: 'Juegos',
    headerClassName: "columnClass",
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: '_max_players',
    headerName: 'Maxima Cantidad Jugadores',
    headerClassName: "columnClass",
    width: 200,
    editable: false,
  },
  {
    field: '_min_players',
    headerName: 'Minima Cantidad Jugadores',
    headerClassName: "columnClass",
    width: 200,
    editable: false,
  },
  {
    field:'_creator',
    headerName: "Creador",
    headerClassName: "columnClass",
    width: 150,
    editable: false,
  },
  {
    field: '_private',
    headerName: 'Privado',
    headerClassName: "columnClass",
    width: 100,
    editable: false,
  },
];


function callApiList(
  filters: ListMatchesFilter,
  setMatches: Function
): void {
  const promise1 = Promise.resolve(
    listMatchesApi(filters, localStorage.getItem("access_token")?.toString()!)
  );
  promise1.then((value) => {
    setMatches(value);
  });
}


export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  useEffect(() => {
    callApiList({}, setMatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callApiList({}, setMatches);
  };

  
  const theme = createTheme();

  return (
    <div>
      <NavBar />
      <div className="bg-image">  
        <ThemeProvider theme={theme}>
           
          <Container component="main">
              <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  id ="my-form"
                />
            </Container>
            <Container 
              sx = {{
                display: 'flex', 
                justifyContent: 'center', 
                pt: 20,
                borderStyle:"none",
              }} >
            { matches.length > 0 ? ( 
                  <Box sx={{height: "60vh", width: 1050, maxWidth: "80vw", bgcolor: "background.paper", borderRadius: "5%", '& .columnClass': {
                    backgroundColor: "#43B647",
                  },}}>
                  <DataGrid
                    rows={matches.map((elem, index) => ({
                      id: index,
                      _name : elem._name,
                      _rounds : elem._rounds,
                      _games : elem._games,
                      _max_players: elem._max_players,
                      _min_players : elem._min_players,
                      _creator : elem._creator,
                      _private : elem._private
                    }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components = {{Toolbar:CustomToolBar,}}
                  />
                </Box>) : (
                  <div></div>
                )}
            </Container>   
          </ThemeProvider>
      </div>
    </div>
  );
}
