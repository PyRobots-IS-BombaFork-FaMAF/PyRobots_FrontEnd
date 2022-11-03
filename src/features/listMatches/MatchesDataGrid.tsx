import { Button } from "@mui/material";
import {
  GridColDef,
  GridToolbarFilterButton,
  GridToolbarContainer,
  DataGrid,
  gridClasses,
} from "@mui/x-data-grid";
import { joinGame, Robot } from "../joinGame/JoinGame";
import { ListMatch } from "./ListMatchesApi";

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

type DataGridProps = {
  matches: ListMatch;
  setRow: Function;
  handleOpen: Function;
  arrRobot: Robot[];
  robotIndex: string;
  setActualMatch: Function;
  setIsCreator: Function;
  setMatches: Function;
  setShowLobby: Function;
  setSocket: Function;
};
export const MatchesDataGrid = ({
  matches,
  setRow,
  arrRobot,
  robotIndex,
  setActualMatch,
  setIsCreator,
  setMatches,
  setShowLobby,
  setSocket,
  handleOpen,
}: DataGridProps) => {
  return (
    <DataGrid
      sx={{
        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
          outline: "none",
        },
        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
          {
            outline: "none",
          },
        border: "none",
      }}
      rows={matches
        .filter((elem, index) => elem._gameStatus === 0)
        .map((elem, index) => ({
          id: elem._id,
          _name: elem._name,
          _rounds: elem._rounds,
          _games: elem._games,
          _max_players: elem._max_players,
          _min_players: elem._min_players,
          _creator: elem._creator,
          _current_players: elem._current_players,
          _private: elem._private,
          _status: elem._status,
        }))}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableColumnSelector
      experimentalFeatures={{ newEditingApi: true }}
      getRowClassName={(params) => `${params.row._status}`}
      components={{ Toolbar: CustomToolBar }}
      onRowClick={(row) => {
        setRow(row);
        if (row.row._status === "joined") {
          joinGame(
            row,
            arrRobot[+robotIndex].name,
            setActualMatch,
            setIsCreator,
            setMatches,
            localStorage.getItem("username")?.toString()!,
            setShowLobby,
            setSocket,
            matches
          );
        } else {
          handleOpen();
        }
      }}
    />
  );
};
