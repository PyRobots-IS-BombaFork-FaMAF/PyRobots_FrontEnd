import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { ListMatch, callApiListMatch } from "./ListMatchesApi";

import {
  Button,
  CssBaseline,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import NavBar from "../directories/NavBar";
import "../directories/Home.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Lobby } from "../joinGame/Lobby";
import { columns, CustomToolBar } from "./DataGridUtils";
import { joinGame, Player, Robot } from "../joinGame/JoinGame";
import { callApiListRobot } from "../robotApi/ListRobotApi";
import { JoinGameApi } from "../joinGame/JoinGameApi";
import { Match } from "./ListMatchesApi"
import swal from "sweetalert2"


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px groover #000",
  borderRadius: 10,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [open, setOpen] = useState(false);
  const [showLobby, setShowLobby] = useState(false);
  const [actualMatch, setActualMatch] = useState<Match | null>(null);
  const [isCreator, setIsCreator] = useState(false);

  const [robotIndex, setRobotIndex] = useState("");
  const [arrRobot, setArrRobot] = useState<Robot[]>([]);
  const [password, setPassword] = useState("");
  const [row, setRow] = useState<any>({});
  const [error, setError] = useState("");

  const handleSubmitJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPassword(data.get("password")?.toString()!);

    if (row.status !== "joined") {
      if(arrRobot[+robotIndex]){
        const player : Player = {
          game_id: row.id,
          robot : arrRobot[+robotIndex].name,
          password : password
        }
        setError(await JoinGameApi(player, localStorage.getItem("access_token")?.toString()!));
      }else{
        swal.fire("Debe crear un robot primero", "" , "error");
      }
    }
    handleClose();
  };
  
  useEffect(() => {
    console.log(error);
    if (error === "Not Error") {
      handleClose();
      setError("");
      joinGame(
        row,
        arrRobot[+robotIndex].name,
        setActualMatch,
        setIsCreator,
        setMatches,
        setShowLobby,
        setSocket,
        matches,
      );
    }
    console.log(actualMatch);
  }, [error, showLobby, password, matches, row, arrRobot, robotIndex, socket])


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setRobotIndex(e.target.value as string);
  };

  useEffect(() => {
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmitMatches = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
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
              onSubmit={handleSubmitMatches}
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
                  },
                  "& .joined": {
                    backgroundColor: "#9BD87A",
                  },
                  "& .notJoined": {
                    backgroundColor: "white",
                  },
                  "& .full": {
                    backgroundColor: "#EF4040",
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
                    if(row.row._status === "joined"){
                      joinGame(
                        row,
                        arrRobot[+robotIndex].name,
                        setActualMatch,
                        setIsCreator,
                        setMatches,
                        setShowLobby,
                        setSocket,
                        matches,
                      );
                      
                    }else{
                      handleOpen();
                    }
                    
                  }}
                />
                <Container>
                  <Modal hideBackdrop open={open} onClose={handleClose}>
                    <Box
                      component="form"
                      onSubmit={handleSubmitJoin}
                      noValidate
                      sx={{ ...style, width: 200 }}
                    >
                      <TextField
                        margin="normal"
                        data-testid="passJoin"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="off"
                      ></TextField>
                      <h3> Elija el robot que quiera usar </h3>
                      <Select
                        data-testid="selectJoin"
                        value={robotIndex}
                        label="Robots"
                        onChange={handleChange}
                      >
                        <MenuItem value=""></MenuItem>
                        {arrRobot.map((elem: Robot, key) => {
                          return (
                            <MenuItem key={key} value={`${key}`}>
                              {elem.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: "#43B647",
                          "&:hover": {
                            backgroundColor: "#43B647",
                            boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
                          },
                        }}
                        onClick={handleClose}
                      >
                        {" "}
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
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
                        Unirse
                      </Button>
                    </Box>
                  </Modal>
                </Container>
              </Box>
            ) : showLobby && actualMatch ? (
              <Lobby
                myKey={0}
                players={actualMatch?._players!}
                setShowLobby={setShowLobby}
                isCreator={isCreator}
                socket={socket}
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
