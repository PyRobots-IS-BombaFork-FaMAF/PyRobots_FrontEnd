import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavBar from "../directories/NavBar";

const CardWin = () => {
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
        <Typography> Robot usado: </Typography>
        <Typography> Jugador: </Typography>
        <CardActions>
          <Button size="small"> Estadísticas </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const CardLose = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        background: "rgba(100,0,0,0.05)",
        borderColor: "#BF0F0F",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem #D38787" }
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: "#BF0F0F" }}>
          PERDISTE
        </Typography>
        <Typography> Robot usado: </Typography>
        <Typography> Jugador: </Typography>
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
    <Box>
      <CardWin />
      <CardLose />
    </Box>
  </div>
);

export default HistoricalResults;
