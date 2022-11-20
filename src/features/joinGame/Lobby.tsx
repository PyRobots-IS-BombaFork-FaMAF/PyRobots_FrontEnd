import { Button, Container, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import defaultPlayer from "../../assets/img/defaultPlayer.jpg";
import defaultRobot from "../../assets/img/defaultRobot.jpg";
import { callApiLaunchApi } from "./LaunchGameApi";
import { leaveMatchApi } from "./LeaveGameApi";
import { callApiListMatch } from "../listMatches/ListMatchesApi";

export type Player = {
  player: string;
  robot: number;
};
export type ListPlayer = Player[];
type PropsLobby = {
  myKey: number;
  setShowLobby: Function;
  players: ListPlayer;
  isCreator: boolean;
  roomId: string;
  roomUrl: string;
  setMatches: Function;
};

type PropsButtons = {
  setMatches: Function;
  setShowLobby: Function;
  roomId: string;
  isCreator: boolean;
  socket: WebSocket | null;
  disableAbandone: boolean;
};

const Buttons = ({
  setMatches,
  setShowLobby,
  roomId,
  isCreator,
  socket,
  disableAbandone,
}: PropsButtons) => {
  const abandoneGame = () => {
    if (!disableAbandone) {
      Swal.fire({
        title: "Estás seguro de querer abandonar la partida?",
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Cancelar`,
        icon: "warning",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */

        if (result.isConfirmed) {
          leaveMatchApi(
            roomId,
            localStorage.getItem("access_token")?.toString()!
          );          
          setTimeout(() => {
            callApiListMatch({}, setMatches);
            setShowLobby(false);
            if(socket){
              socket.close();
            }
          }, 1000);
          
        }
      });
    } else {
      Swal.fire("Cuidado", "No se puede abandonar", "warning");
    }
  };

  const launchGame = () => {
    callApiLaunchApi(roomId);
  };

  return (
    <Stack direction="row" sx={{ mt: 3 }}>
      <Grid item xs={4}>
        <Button
          onClick={(event) => {
            setTimeout(() => {
              callApiListMatch({}, setMatches);
              setShowLobby(false);
              if(socket){
                socket.close();
              }
            }, 1000);
            
            
          }}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#ECE04A",
            "&:hover": {
              backgroundColor: "#ECE04A",
              boxShadow: "0rem 0.1rem 0.5rem #EEE56D",
            },
          }}
        >
          Ir a listar partidas
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => launchGame()}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#43B647",
            "&:hover": {
              backgroundColor: "#43B647",
              boxShadow: "0rem 0.1rem 0.5rem #45E14B",
            },
          }}
          disabled={!isCreator}
        >
          Iniciar Partida
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#C72603",
            "&:hover": {
              backgroundColor: "#C72603",
              boxShadow: "0rem 0.1rem 0.5rem #E23D19",
            },
          }}
          disabled={isCreator}
          onClick={() => abandoneGame()}
        >
          Abandonar Partida
        </Button>
      </Grid>
    </Stack>
  );
};

export const Lobby = ({
  myKey,
  players,
  setShowLobby,
  isCreator,
  roomId,
  roomUrl,
  setMatches,
}: PropsLobby) => {
  const [playersSocket, setPlayersSocket] = useState<ListPlayer>([]);
  const [serverMessage, setServerMessage] = useState("");
  const [disableAbandone, setDisableAbandone] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000${roomUrl}`);
    ws.current = socket;
    socket.onopen = () => {
      console.log("ws open");
      socket.onmessage = async (event) => {
        const json = JSON.parse(event.data);
        console.log(json);
        if (json.status === 0 || json.status === 1 || json.status === 4) {
          setPlayersSocket(json.players);
          setServerMessage(json.message);
        } else if (json.status === 2 || json.status === 3) {
          setDisableAbandone(true);
          setServerMessage(json.message);
        }
      };
    };
    socket.onclose = () => console.log("ws closed");
    return  () => socket.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws])

  return (
    <Grid
      key={myKey}
      container
      sx={{
        width: "50vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px groove #43B647",
        borderRadius: 10,
      }}
    >
      <Grid>
        <Container>
          <Stack spacing={3}>
            {playersSocket.map((player: Player, key: number): JSX.Element => {
              return (
                <Stack
                  direction="row"
                  key={key}
                  sx={{
                    width: "30vw",
                    mt: 5,
                    borderStyle: "double",
                    borderRadius: 60,
                    borderColor: "#43B647",
                  }}
                >
                  <Grid item xs={2}>
                    <Avatar
                      alt="Player"
                      src={defaultPlayer}
                      sx={{ height: "50px", width: "50px" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6"> {player.player} </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Avatar
                      alt="Robot"
                      src={defaultRobot}
                      sx={{ height: "50px", width: "50px" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{player.robot} </Typography>
                  </Grid>
                </Stack>
              );
            })}
          </Stack>
          <h6>{serverMessage}</h6>
        </Container>
      </Grid>
      <Buttons
        setMatches={setMatches}
        setShowLobby={setShowLobby}
        roomId={roomId}
        isCreator={isCreator}
        socket={ws.current}
        disableAbandone={disableAbandone}
      ></Buttons>
    </Grid>
  );
};
