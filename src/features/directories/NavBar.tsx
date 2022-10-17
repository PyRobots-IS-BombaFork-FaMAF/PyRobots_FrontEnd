import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  const createRobot = () => {
    //TODO - Implementar createRobot para poder redireccionar
    //navigate("/createRobot", { replace: true });
  };
  const executeSimulation = () => {
    navigate("/tableroDePrueba", { replace: true });
  };
  const listMatches = () => {
    navigate("/listMatches", { replace: true });
  };
  const createMatch = () => {
    navigate("/newGame", { replace: true });
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" data-testid="AppBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            textAlign="left"
          >
            PyRobots
          </Typography>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => createRobot()}
            data-testid="crearRobot"
          >
            Crear Robot
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => executeSimulation() }
            data-testid="ejecutarSim"
          >
            Ejecutar Simulacion
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => createMatch()}
            data-testid="crearPartida"
          >
            Crear Partida
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => listMatches()}
            data-testid="listarPartidas"
          >
            Listar Partidas
          </Button>
          <Button
            sx={{ mr: 5 }}
            color="inherit"
            onClick={(e) => logOut()}
            data-testid="logOut"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
