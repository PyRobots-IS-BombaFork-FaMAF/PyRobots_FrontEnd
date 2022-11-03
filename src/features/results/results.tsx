import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../directories/NavBar";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Pagination from "@mui/material/Pagination";
import swal from "sweetalert2";

type modalState = {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalState = React.createContext<modalState>({
  modal: false,
  setModal: () => {},
});

const Stats = (props: any) => {
  const { modal } = React.useContext(ModalState);
  const { setModal } = React.useContext(ModalState);
  const result = props.currentResult[props.idStats];


  const infoGame =
    props.currentResult.length > 0 ? (
      <div>
        <Typography variant="h5">Configuración de partida </Typography>
        <Stack divider={<Divider />}>
          <Typography>
            <strong>Nombre de la partida:</strong> {result.name}
          </Typography>
          <Typography>
            <strong>Jugadores:</strong> {result.players.length}
          </Typography>
          <Typography>
            <strong>Cantidad de juegos:</strong> {result.games}
          </Typography>
          <Typography>
            <strong>Cantidad de rondas:</strong> {result.rounds}
          </Typography>
          <Typography>
            <strong>Privada:</strong> {result.is_private.toString()}
          </Typography>
        </Stack>
      </div>
    ) : (
      <div> </div>
    );

  const winner =
    props.currentResult.length > 0 ? (
      result.winners.length > 1 ? (
        <div> </div>
      ) : (
        <div>
          <Typography variant="h5">Ganador </Typography>
          <Stack divider={<Divider />}>
            <Typography>
              <strong>Nombre del robot:</strong> {result.winners[0].robot}
            </Typography>
            <Typography>
              {" "}
              <strong>Usuario:</strong> {result.winners[0].player}
            </Typography>
          </Stack>
        </div>
      )
    ) : (
      <div> </div>
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
          {infoGame}
          {winner}
          <Button
            variant="outlined"
            onClick={() => setModal(false)}
            color="error"
            sx={{ width: "100%", color: "#BF0F0F", mt: "10px" }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export const CardWin = (props: any) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = (e: any) => {
    setModal(true);
    props.setIdStats(e.target.getAttribute("id"));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: "rgba(0,80,0,0.001)",
        boxShadow: 6,
        border: "2px solid #2EA52E",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #93D696" },
      }}
    >
      <CardContent>
        <Typography data-testid="text-win" variant="h4" sx={{ color: "#43B647" }} >
          GANASTE
        </Typography>
        <Typography>
          <strong>Robot usado:</strong> {props.robotName}
        </Typography>
        <Typography>
          {" "}
          <strong>Nombre de partida:</strong> {props.gameName}
        </Typography>
        <Typography>
          {" "}
          <strong>Fecha de creación:</strong> {props.gameDate}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            id={props.index}
            sx={{
              width: "100%",
              backgroundColor: "#43B647",
              "&:hover": { backgroundColor: "#43B647" },
            }}
          >
            Estadísticas
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export const CardDraw = (props: any) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = (e: any) => {
    setModal(true);
    props.setIdStats(e.target.getAttribute("id"));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: "#EAD99D",
        boxShadow: 6,
        border: "2px solid #B7992C",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #EAD99D" },
      }}
    >
      <CardContent>
        <Typography data-testid="text-draw" variant="h4" sx={{ color: "#B7992C" }}>
          EMPATE
        </Typography>
        <Typography>
          <strong>Robot usado:</strong> {props.robotName}
        </Typography>
        <Typography>
          {" "}
          <strong>Nombre de partida:</strong> {props.gameName}
        </Typography>
        <Typography>
          {" "}
          <strong>Fecha de creación:</strong> {props.gameDate}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            id={props.index}
            sx={{
              width: "100%",
              backgroundColor: "#D1C51D",
              "&:hover": { backgroundColor: "#D1C51D" },
            }}
          >
            Estadísticas
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export const CardLose = (props: any) => {
  const { setModal } = React.useContext(ModalState);

  const handleClick = (e: any) => {
    setModal(true);
    props.setIdStats(e.target.getAttribute("id"));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        boxShadow: 6,
        background: "rgba(100,0,0,0.05)",
        border: "2px solid #BF0F0F",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #D38787" },
      }}
    >
      <CardContent>
        <Typography data-testid="text-lose" variant="h4" sx={{ color: "#BF0F0F" }}>
          PERDISTE
        </Typography>
        <Typography>
          <strong>Robot usado:</strong> {props.robotName}
        </Typography>
        <Typography>
          {" "}
          <strong>Nombre de partida:</strong> {props.gameName}
        </Typography>
        <Typography>
          {" "}
          <strong>Fecha de creación:</strong> {props.gameDate}
        </Typography>
        <CardActions>
          <Button
            onClick={handleClick}
            type="submit"
            role="button"
            variant="contained"
            data-testid="submit-robot"
            id={props.index}
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

const HistoryResults = () => {
  const [modal, setModal] = useState<boolean>(false);

  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage] = useState<number>(25);
  const [idStats, setIdStats] = useState<number>(0);
  const access_token = localStorage.getItem("access_token")?.toString();

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      await axios
        .get("game/results", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(function (error) {
          swal.fire({
            title: "Error",
            text: error.response.data.detail,
            icon: "error",
            confirmButtonColor: "#43B647",
          });
          if (error.response.status === 401) {
            localStorage.clear();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get current results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResult = results.slice(indexOfFirstResult, indexOfLastResult);

  const searchName = (players: any) =>
    localStorage.getItem("username")?.toString() === players.player;

  return loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <div>
      <NavBar />
      <ModalState.Provider value={{ modal, setModal }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          {currentResult.map((result: any, index: number) =>
            currentResult.length > 0 ? (
              <Grid key={index}>
                {result.winners.length > 1 && 
                  result.winners.find((element: any) => searchName(element)) ? (
                  <CardDraw
                    index={index}
                    setIdStats={setIdStats}
                    robotName={result.players.find((element: any) => searchName(element)).robot}
                    gameDate={result.creation_date}
                    gameName={result.name}
                  />
                ) : result.winners.length === 1 &&
                  result.winners.find((element: any) => searchName(element)) ? (
                  <CardWin
                    index={index}
                    setIdStats={setIdStats}
                    robotName={result.players.find((element: any) => searchName(element)).robot}
                    gameDate={result.creation_date}
                    gameName={result.name}
                  />
                ) : (
                  <CardLose
                    index={index}
                    setIdStats={setIdStats}
                    robotName={result.players.find((element: any) => searchName(element)).robot}
                    gameDate={result.creation_date}
                    gameName={result.name}
                  />
                )}
              </Grid>
            ) : (
              <h1> No has jugado partidas aún. </h1>
            )
          )}
        </Grid>
        <Stats idStats={idStats} currentResult={currentResult} />
      </ModalState.Provider>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        variant="outlined"
        onChange={handleChange}
        count={Math.ceil(results.length / resultsPerPage)}
      />
    </div>
  );
};

export default HistoryResults;
