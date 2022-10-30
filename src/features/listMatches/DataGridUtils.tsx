import { Button } from "@mui/material";
import {
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hide: true,
    filterable: false,
  },
  {
    field: "_name",
    headerName: "Nombre",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_rounds",
    headerName: "Rondas",
    headerClassName: "columnClass",
    type: "number",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_games",
    headerName: "Juegos",
    headerClassName: "columnClass",
    type: "number",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_current_players",
    headerName: "Jugadores",
    headerClassName: "columnClass",
    width: 100,
    editable: false,
    hideable: false,
  },
  {
    field: "_max_players",
    headerName: "Maximos Jugadores",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_min_players",
    headerName: "Minimos Jugadores",
    headerClassName: "columnClass",
    width: 200,
    editable: false,
    hideable: false,
  },
  {
    field: "_creator",
    headerName: "Creador",
    headerClassName: "columnClass",
    width: 150,
    editable: false,
    hideable: false,
  },
  {
    field: "_joined",
    headerName: "Joined",
    headerClassName: "columnClass",
    width: 150,
    editable: false,
    hide: true,
    filterable: false,
  },
  {
    field: "_private",
    headerName: "Privado",
    headerClassName: "columnClass",
    width: 100,
    editable: false,
    hideable: false,
  },
];

export const CustomToolBar = (): JSX.Element => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <Button
        type="submit"
        fullWidth
        form="my-form"
        variant="contained"
        data-testid="submit"
        sx={{
          maxWidth: 100,
          mt: 2,
          mb: 2,
          ml: 2,
          backgroundColor: "#43B647",
          "&:hover": {
            backgroundColor: "#43B647",
            boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
          },
        }}
      >
        Refresh
      </Button>
    </GridToolbarContainer>
  );
};
