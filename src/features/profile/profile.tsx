import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  createTheme,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import NavBar from "../directories/NavBar";

const theme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          textAlign: "left",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "120px",
          height: "120px",
          margin: "40px",
        },
      },
    },
  },
});

const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid container>
        <Grid item xs></Grid>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "#f2f2f2",
            borderRadius: "5px",
          }}
        >
          {/* <ButtonLoadAvatar /> */}
          <Grid container>
            <Grid item xs="auto">
              <Avatar variant="rounded" alt="User Avatar" />
            </Grid>
            <Grid item xs="auto" sx={{ margin: "auto" }}>
              <Typography variant="h3" sx={{ margin: "auto" }}>
                {" "}
                Hola Usuario!{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ marginLeft: "50px", color: "#737373" }}
              >
                INFORMACIÓN DE CUENTA
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={12}>
              <Stack
                spacing={1}
                divider={<Divider variant="middle" />}
                sx={{ margin: "20px 50px 0 50px" }}
              >
                <Typography> Nombre de usuario: </Typography>
                <Typography> Dirección de correo: </Typography>
                <Typography> Constraseña: </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Profile;
