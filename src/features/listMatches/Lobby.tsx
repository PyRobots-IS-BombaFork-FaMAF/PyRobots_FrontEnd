import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { Button, Typography, Grid } from "@mui/material";
import defaultPlayer from "../../assets/img/defaultPlayer.jpg";
import defaultRobot from "../../assets/img/defaultRobot.jpg";
import Swal from "sweetalert2";

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

const launchGame = () => {};
export const Lobby = ({ myKey, players, setShowLobby, isCreator }: Props) => {
  return (
    <Container key={myKey}>
      <Grid
        container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: -20,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "40vw",
            heigth: "100vh",
            maxHeight: "100vh",
            borderStyle: "groove",
            borderRadius: 10,
            borderColor: "#43B647",
          }}
        >
          <Stack spacing={3} >
            <Grid item xs={3}></Grid>
            {players.map((player: any, key: number): any => {
              return (
                <Stack
                  direction="row"
                  key={key}
                  sx={{
                    width: "30vw",
                    mt: 1,
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
                  <Grid item xs={2}>
                    <Typography variant="h6"> {player.player} </Typography>
                  </Grid>
                  <Grid item xs={2}></Grid>
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

          <Stack direction="row" sx={{ mt: 3 }}>
            <Grid item xs={4}>
              <Button
                onClick={(event) => {
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
                  launchGame();
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
        </Paper>
      </Grid>
    </Container>
  );
};
