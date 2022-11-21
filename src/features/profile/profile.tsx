import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  CircularProgress,
  createTheme,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../directories/NavBar";
import { callApiFetchInfo } from "./profileApi";
import { userInfo } from "./profileBoardHelper";

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
  const access_token = localStorage.getItem("access_token")?.toString();
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<userInfo | null>(null);

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
          <Grid container>
            <Grid item xs="auto">
              <Avatar
                variant="rounded"
                alt="User Avatar"
                src={`data:image/${info!.avatar_name.split(".")[1]};base64,${
                  info!.avatar_img.split("'")[1].split("'")[0]
                }`}
              />
            </Grid>
            <Grid item xs="auto" sx={{ margin: "auto" }}>
              <Typography variant="h3" sx={{ margin: "auto" }}>
                Hola {info!.name}!
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
                <Typography>
                  Nombre de usuario: <strong>{info!.name}</strong>
                </Typography>
                <Typography>
                  Dirección de correo: <strong>{info!.email}</strong>
                </Typography>
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
