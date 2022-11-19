import { Divider, Grid, Stack, Typography } from "@mui/material";
import NavBar from "../directories/NavBar";
import { AvatarRobot, ButtonChangeAvatar } from "../newrobot/CreateRobot";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <Grid container sx={{ paddingTop: "20px" }}>
        <Grid item xs></Grid>
        <Grid
          item
          xs={4}
          sx={{ backgroundColor: "#f2f2f2", borderRadius: "5px" }}
        >
          <AvatarRobot />
          <ButtonChangeAvatar />
          {/* <ButtonLoadAvatar /> */}
          <Grid container>
            <Grid item xs={3}>
              <h3>Mi perfil</h3>
            </Grid>
            <Grid item xs={9}></Grid>
            <Grid item xs={12}>
              <Stack
                spacing={1}
                divider={<Divider />}
              >
                <p> Nombre: </p>
                <p> Dirección de correo: </p>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

export default Profile;
