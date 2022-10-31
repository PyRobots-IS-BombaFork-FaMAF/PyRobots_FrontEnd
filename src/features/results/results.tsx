import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../directories/NavBar";
import { Box, Divider, Grid, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { AvatarRobot } from "../newrobot/CreateRobot";

type modalState = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalState = React.createContext<modalState>({
  modal: false,
  setModal: () => {},
});

const results = [
  {
    winner: { player: "Fran123", robot: "robot1" },
  },
  {
    winner: { player: "persona 1", robot: "robot1" },
  },
  {
    winner: { player: "persona 2", robot: "robot1" },
  },
  {
    winner: { player: "persona 3", robot: "robot1" },
  },
  {
    winner: { player: "persona", robot: "robot1" },
  },
  {
    winner: { player: "persona 1", robot: "robot1" },
  },
  {
    winner: { player: "persona 2", robot: "robot1" },
  },
  {
    winner: { player: "persona 3", robot: "robot1" },
  },
  {
    winner: { player: "persona 4", robot: "robot1" },
  },
  {
    winner: { player: "persona", robot: "robot1" },
  },
  {
    winner: { player: "persona 1", robot: "robot1" },
  },
  {
    winner: { player: "persona 2", robot: "robot1" },
  },
  {
    winner: { player: "persona 3", robot: "robot1" },
  },
  {
    winner: { player: "persona 4", robot: "robot1" },
  },
];

const Stats = () => {
  const { modal } = React.useContext(ModalState);
  const { setModal } = React.useContext(ModalState);

  const statsInfo = (
    <div>
      <Typography variant="h5">Configuración de partida </Typography>
      <Stack divider={<Divider />}>
        <Typography>Nombre de la partida:</Typography>
        <Typography>Jugadores:</Typography>
        <Typography>Cantidad de juegos:</Typography>
        <Typography> Cantidad de rondas: </Typography>
        <Typography> Privada: </Typography>
      </Stack>
      <Typography variant="h5">Ganador </Typography>
      <AvatarRobot />
      <Stack mt={2} divider={<Divider />}>
        <Typography> Nombre del robot: </Typography>
        <Typography> Usuario: </Typography>
      </Stack>
      <Button
        variant="outlined"
        onClick={() => setModal(false)}
        color="error"
        sx={{ width: "100%", color: "#BF0F0F", mt: "10px" }}
      >
        Cerrar
      </Button>
    </div>
  );

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Modal open={modal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {statsInfo}
        </Box>
      </Modal>
    </div>
  );
};

const CardWin = (props: any) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = () => {
    setModal(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: "rgba(0,80,0,0.001)",
        boxShadow: 1,
        borderColor: "#2EA52E",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #93D696" },
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: "#43B647" }}>
          GANASTE
        </Typography>
        <Typography>
          <strong>Robot usado:</strong> {props.robotName}
        </Typography>
        <Typography>
          {" "}
          <strong>Nro. de partida:</strong>{" "}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            sx={{
              width: "100%",
              backgroundColor: "#43B647",
              "&:hover": { backgroundColor: "#43B647" },
            }}
          >
            {" "}
            Estadísticas{" "}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const CardLose = (props: any) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = () => {
    setModal(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: "rgba(100,0,0,0.05)",
        borderColor: "#BF0F0F",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #D38787" },
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: "#BF0F0F" }}>
          PERDISTE
        </Typography>
        <Typography>
          <strong>Robot usado:</strong> {props.robotName}
        </Typography>
        <Typography>
          {" "}
          <strong>Nro. de partida:</strong>{" "}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            sx={{
              width: "100%",
              backgroundColor: "#BF0F0F",
              "&:hover": { backgroundColor: "#BF0F0F" },
            }}
          >
            {" "}
            Estadísticas{" "}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const HistoricalResults = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div>
      <NavBar />
      <ModalState.Provider value={{ modal, setModal }}>
        <Grid container>
          {results.map((result: any, index: number) => (
            <Grid key={index}>
              {result.winner.player ===
              localStorage.getItem("username")?.toString() ? (
                <CardWin
                  playerName={result.winner.player}
                  robotName={result.winner.robot}
                />
              ) : (
                <CardLose
                  playerName={result.winner.player}
                  robotName={result.winner.robot}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Stats />
      </ModalState.Provider>
    </div>
  );
};

export default HistoricalResults;
