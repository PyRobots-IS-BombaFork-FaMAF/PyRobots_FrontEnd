import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Input } from "@mui/material";
import {
  setErrUser,
  setErrEmail,
  setErrPass,
  selectSignUp,
} from "../../reducers/signUpSlice";
import { isValidEmail, isValidPassword, isValidUserName } from "./SignUpUtils";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signUpApi } from "./SignUpApi";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../app/hooks/useAuth";
import { useToken } from "../TokenUtils";
import { useState } from "react";

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

export default function SignUp() {
  const validate = useAppSelector(selectSignUp);
  const { auth, setAuth } = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useToken(auth, setIsLoggedIn, setAuth);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fun: Function
  ) => {
    return event.target.value !== "" && fun(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*
      Los datos del formulario nunca devuelven null por lo tanto no hace falta chequearlo, si devuelven cadena " " pero esto lo revisa el isValid.. de cualquier manera
    */
    const data = new FormData(event.currentTarget);
    if (
      isValidUserName(data.get("username")?.toString()!) &&
      isValidPassword(data.get("password")?.toString()!) &&
      isValidEmail(data.get("email")?.toString()!)
    ) {
      signUpApi(data);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <ThemeProvider theme={theme}>
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
                Registrarse
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-userName"
                      name="username"
                      required
                      fullWidth
                      onChange={(
                        event: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) =>
                        dispatch(
                          setErrUser(handleChange(event, isValidUserName))
                        )
                      }
                      data-testid="user"
                      id="userName"
                      label="Usuario"
                      error={!validate.errUser}
                      autoFocus
                      helperText={
                        !validate.errUser
                          ? "Tamaño válido mínimo 6 y máximo 12 caracteres."
                          : " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={(
                        event: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) =>
                        dispatch(setErrEmail(handleChange(event, isValidEmail)))
                      }
                      id="email"
                      label="Direccion De Email"
                      name="email"
                      autoComplete="email"
                      data-testid="email"
                      error={!validate.errEmail}
                      helperText={
                        !validate.errEmail
                          ? "Email Invalido formato something@example.com"
                          : " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={(
                        event: React.ChangeEvent<
                          HTMLTextAreaElement | HTMLInputElement
                        >
                      ) =>
                        dispatch(
                          setErrPass(handleChange(event, isValidPassword))
                        )
                      }
                      data-testid="pass"
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="nueva-password"
                      error={!validate.errPass}
                      helperText={
                        !validate.errPass
                          ? "Contraseña Invalida, Verifique si la password tiene al menos 8 caracteres," +
                            "una mayúscula, una minúscula, y un número. Puede agregar un símbolo. Tamaño máximo 16 caracteres."
                          : " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="left">
                    Cargar Avatar(Opcional)
                    <Input
                      fullWidth
                      type="file"
                      role="button"
                      name="avatar"
                      id="avatar"
                      title="avatar"
                      data-testid="avatar"
                      autoComplete="insertar Avatar"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  role="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2" role="link">
                      Ya tienes cuenta? Inicie sesión
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}
