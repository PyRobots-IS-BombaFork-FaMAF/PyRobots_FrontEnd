import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userInfo } from "../profile/profileBoardHelper";
import { callApiFetchInfo } from "../profile/profileApi";
import { Avatar, CircularProgress, Grid, Menu, MenuItem } from "@mui/material";

export default function NavBar(): JSX.Element {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [info, setInfo] = useState<userInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const access_token = localStorage.getItem("access_token")?.toString();
  const settings = ["Perfil", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const createRobot = () => {
    navigate("/createRobot", { replace: true });
  };
  const executeSimulation = () => {
    navigate("/Simulation", { replace: true });
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
  const historyResults = () => {
    navigate("/results", { replace: true });
  };
  const profile = () => {
    navigate("/profile", { replace: true });
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(event);
    if (event.currentTarget.innerHTML === "Perfil") {
      profile();
    } else if (event.currentTarget.innerHTML === "Logout") {
      logOut();
    }
  };

  useEffect(() => {
    callApiFetchInfo(access_token, setInfo, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        data-testid="AppBar"
        sx={{ backgroundColor: "#43B647" }}
      >
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
            onClick={(e) => executeSimulation()}
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
            onClick={(e) => historyResults()}
          >
            Historial de partidas
          </Button>
          <IconButton
            sx={{ mr: 5 }}
            color="inherit"
            onClick={handleOpenUserMenu}
            data-testid="logOut"
          >
            <Avatar
              sx={{ width: "50px", height: "50px", margin: "0" }}
              src={`data:image/${info!.avatar_name.split(".")[1]};base64,${
                info!.avatar_img.split("'")[1].split("'")[0]
              }`}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handleClick}>
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
