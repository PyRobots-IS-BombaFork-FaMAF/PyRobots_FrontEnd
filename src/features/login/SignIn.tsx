import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../../app/hooks/useAuth";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { verifyToken } from "../TokenUtils";
import LoadingSpin from "react-loading-spin";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        pyrobots.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const { auth, setAuth }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    auth?.access_token === undefined ?  verifyToken(setIsLoading, setAuth) : setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post("token", data, {});
      const username = data.get("username");
      const password = data.get("password");
      const access_token = response?.data?.access_token;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("isLoggedIn", "true");
      if(username){
        localStorage.setItem("username", username?.toString());
      }
      if(password){
        localStorage.setItem("password", password?.toString());
      }


      
      setAuth({ username, password, access_token });
      navigate("/tableroDePrueba", { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        alert("No hay respuesta del servidor");
      } else if (err.response?.status === 401) {
        alert("Contraseña Invalida");
      } else {
        alert("Inicio de sesión fallido");
      }
    }
  };

  return (
    <div>
    { isLoading ? 
      <div>
        <h2>Cargando..</h2>
        <LoadingSpin size = "500px" width = "50px"/>
      </div>
          : (isLoggedIn ? (<Navigate to="/" state={{ from: location }} replace />): (<ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Iniciar Sesión
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    data-testid="user"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="off"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    data-testid="pass"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    data-testid="submit"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Iniciar Sesión
                  </Button>
    
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Olvido la contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"¿No tienes cuenta? Registrate"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>))
    }
  </div>
  );  
}
