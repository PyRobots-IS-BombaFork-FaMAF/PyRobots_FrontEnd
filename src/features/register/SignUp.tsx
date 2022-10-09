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
import { isValidEmail, isValidPassword, isValidUserName } from "./SingUpUtils";
import { postUser } from "./SignUpApi";

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
  const [errorUserName, setErrorUserName] = useState<boolean | undefined>(
    false
  );
  const [errorEmail, setErrorEmail] = useState<boolean | undefined>(false);
  const [errorPassword, setErrorPassword] = useState<boolean | undefined>(
    false
  );

  const handleChange = (event: any, fun: Function) => {
    return fun(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userJson = {
      username: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"), //,
      //avatar: data.get("avatar"),
    };
    if (
      data.get("userName") !== null &&
      data.get("password") !== null &&
      data.get("email") !== null
    ) {
      if (
        isValidUserName(data.get("userName")?.toString()!) &&
        isValidPassword(data.get("password")?.toString()!) &&
        isValidEmail(data.get("email")?.toString()!)
      ) {
        postUser(userJson);
      }
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
                  onChange={(event) =>
                    setErrorUserName(handleChange(event, isValidUserName))
                  }
                  id="userName"
                  label="User Name"
                  error={!errorUserName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(event) =>
                    setErrorEmail(handleChange(event, isValidEmail))
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!errorEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(event) =>
                    setErrorPassword(handleChange(event, isValidPassword))
                  }
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!errorPassword}
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
