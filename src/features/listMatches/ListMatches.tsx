import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import {
  ListMatchesFilter,
  ListMatch,
  listMatchesApi,
  Match,
} from "./ListMatchesApi";
import { Button, CssBaseline } from "@mui/material";
import NavBar from "../directories/NavBar";
import "../directories/Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  GridToolbarFilterButton,
  GridToolbarContainer,
  DataGrid,
  gridClasses,
} from "@mui/x-data-grid";
import { initSocket, message } from "../../websocket/WebSocket";
import { Lobby } from "./Lobby";
import { JoinGameApi } from "./JoinGameApi";
import { columns } from "./ListMatchesColumns";

function CustomToolBar(): JSX.Element {
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
}

function callApiList(
  filters: ListMatchesFilter,
  matches: ListMatch,
  setMatches: Function
): void {
  const promise1 = Promise.resolve(
    listMatchesApi(filters, localStorage.getItem("access_token")?.toString()!)
  );
  promise1.then((value) => {
    setMatches(JSON.parse(value).map((match: Match) => {
      if(match._players
        .map((elem: any) => {
          return (
            elem.player === localStorage.getItem("username")?.toString()!
          );
        }).includes(true)){
          return({...match, _joined:"joined"});
        }else{
          return ({...match, _joined:"notJoined"});
        }
      }));   
  });
}

export type Player = {
  game_id: number;
  robot: string;
  password: string;
};

export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [showLobby, setShowLobby] = useState(false);
  const [room, setRoom] = useState("");
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    callApiList({}, matches, setMatches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callApiList({}, matches, setMatches);
  };
 
  const theme = createTheme();

  function joinGame(row: any) {
    // Como las listas funcionan desde 0, matches necesita ser indexado con -1, pero las partidas se manejan de 1 en adelante.
    const key = row.id - 1;
    if (matches[row.id - 1]._creator !== localStorage.getItem("username")) {
      const player: Player = {
        game_id: row.id,
        robot: "hola",
        password: "",
      };
      JoinGameApi(player, localStorage.getItem("access_token")?.toString()!);
      setRoom(matches[key]._websocketurl);
      setIsCreator(false);
    } else {
      setRoom(matches[key]._websocketurl);
      setIsCreator(true);
    }
    const game = room;
    setShowLobby(true);
    if (!socket) {
      setSocket(initSocket(game));
    } else {
      message(socket);
      socket.close();
    }
  }

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
              id="my-form"
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 20,
            }}
          >
            {matches.length > 0 && !showLobby ? (
              <Box
                sx={{
                  height: "60vh",
                  width: 1250,
                  maxWidth: "90vw",
                  bgcolor: "background.paper",
                  borderRadius: "5%",
                  border: "solid 2px",
                  borderColor: "#43B647",
                  "& .columnClass": {
                    backgroundColor: "#43B647",
                  },'& .joined': {
                    backgroundColor: "#9BD87A",
                  },
                  '& .notJoined': {
                    backgroundColor: "white",
                  },
                }}
              >
                <DataGrid
                  sx={{
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                      {
                        outline: "none",
                      },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                      {
                        outline: "none",
                      },
                    border: "none",
                  }}
                  rows={matches.map((elem, index) => ({
                    id: elem._id,
                    _name: elem._name,
                    _rounds: elem._rounds,
                    _games: elem._games,
                    _max_players: elem._max_players,
                    _min_players: elem._min_players,
                    _creator: elem._creator,
                    _current_players: elem._current_players,
                    _private: elem._private,
                    _joined: elem._joined
                  }))}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableColumnSelector
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowClassName={(params) => `${params.row._joined}`}
                  components={{ Toolbar: CustomToolBar }}
                  onRowClick={(row) => joinGame(row)}
                />
              </Box>
            ) : showLobby ? (
              <Lobby
                myKey={0}
                players={props.players}
                setShowLobby={setShowLobby}
                isCreator={isCreator}
              ></Lobby>
            ) : (
              <div></div>
            )}
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

const props: any = {
  players: [
    {
      player: "player1",
      robot: "robot1",
    },
    {
      player: "player2",
      robot: "robot2",
    },
    {
      player: "player3",
      robot: "robot3",
    },
    {
      player: "player4",
      robot: "robot4",
    },
  ],
};
