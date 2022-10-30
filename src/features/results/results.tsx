import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../directories/NavBar";
import { Grid } from "@mui/material";

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

const CardWin = (props: any) => {
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
          <Button size="small"> Estadísticas </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const CardLose = (props: any) => {
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
          <Button size="small"> Estadísticas </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const HistoricalResults = () => (
  <div>
    <NavBar />
    <Grid container>
      {results.map((result: any, index: number) => (
        <Grid key={index}>
          {result.winner.player === localStorage.getItem("username")?.toString() ? (
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
  </div>
);

export default HistoricalResults;
