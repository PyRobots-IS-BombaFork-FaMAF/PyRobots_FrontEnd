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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: any) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  };

  const isValidPassword = (password: any) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };
  const isValidUserName = (username: string) => {
    return username.length < 20;
  };

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case "email":
        !isValidEmail(event.target.value) && event.target.value !== ""
          ? setError("Email is invalid")
          : setError(null);
        break;
      case "password":
        !isValidPassword(event.target.value) && event.target.value !== ""
          ? setError("Password is invalid")
          : setError(null);
        break;
      case "userName":
        !isValidUserName(event.target.value) && event.target.value !== ""
          ? setError("Username is invalid")
          : setError(null);
        break;
      default:
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    switch (error) {
      case "Email is invalid":
        alert("Email is invalid");
        break;
      case "Username is invalid":
        alert("Username is invalid");
        break;
      case "Password is invalid":
        alert("Password is invalid");
        break;
      case null:
        data.get("email") !== "" && data.get("userName") !== "" && data.get("password") !== "" ? console.log({
          username: data.get("userName"),
          email: data.get("email"),
          password: data.get("password"),
          avatar: data.get("avatar"),
        }) : alert("Requiered field missing"); 
        break;
      default:
        console.log(error);
    }
  };

  return (
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
            Sign up
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
                  name="userName"
                  required
                  fullWidth
                  onChange={handleChange}
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  fullWidth
                  type="file"
                  name="avatar"
                  id="avatar"
                  autoComplete="insert Avatar"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
