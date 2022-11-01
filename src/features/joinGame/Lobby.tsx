import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button, Typography, Grid } from "@mui/material";
import defaultPlayer from "../../assets/img/defaultPlayer.jpg";
import defaultRobot from "../../assets/img/defaultRobot.jpg";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { message } from "../../websocket/WebSocket";
// import { message } from "../../websocket/WebSocket";

type Props = {
  myKey: number;
  players: [
    {
      player: string;
      robot: string;
    }
  ];
  setShowLobby: Function;
  isCreator: boolean;
  socket: WebSocket | undefined;
};

const abandoneGame = () => {
  Swal.fire({
    title: "Estas seguro de querer abandonar la partida?",
    showDenyButton: true,
    confirmButtonText: "Aceptar",
    denyButtonText: `Cancelar`,
    icon: "warning",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //TODO - implementar abandonar partida
    }
  });
};

const launchGame = (socket: WebSocket | undefined) => {


};
export const Lobby = ({
  myKey,
  players,
  setShowLobby,
  isCreator,
  socket,
}: Props) => {
  console.log(players);
  useEffect(() => {
    message(socket!);
  }, [socket])
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
        <Stack spacing={3}>
          {players.map((player: any, key: number): any => {
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
      </Grid>

      <Stack direction="row" sx={{ mt: 3 }}>
        <Grid item xs={4}>
          <Button
            onClick={(event) => {
              socket?.close();
              setShowLobby(false);
            }}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#ECE04A",
              "&:hover": {
                backgroundColor: "#ECE04A",
                boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
              },
            }}
          >
            Ir a listar partidas
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={(event) => {
              launchGame(socket);
            }}
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
                boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
              },
            }}
            disabled={isCreator}
            onClick={() => abandoneGame()}
          >
            Abandonar Partida
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
};
