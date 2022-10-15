import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";


function GameForm() {
  return (
    <form>
      <Grid item xs={12} >
        <TextField required id="game-name" label="Nombre" variant="standard" />
      </Grid>
      <Grid item xs={12} >
        <TextField id="games-amount" label="Cantidad de simulaciones" variant="standard" />
      </Grid>
      <Grid item xs={12} >
        <TextField id="rounds-amount" label="Cantidad de rondas" variant="standard" />
      </Grid>
      <Grid item xs={12} >
        <TextField id="max-players" label="Máximo de jugadores" variant="standard" />
      </Grid>
      <Grid item xs={12} >
        <TextField id="min-players" label="Mínimo de jugadores" variant="standard" />
      </Grid>
      <Grid item xs={12} >
        <TextField id="password" label="Contraseña" variant="standard" />
      </Grid>
      <Button
        type="submit"
        role="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Crear Partida
      </Button>
      </form>
  );
};


function NewGame() {
  // blue theme
  const theme: Theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <div>
        <h1>Crear partida</h1>
        <GameForm />
      </div>
    </ThemeProvider>
  );
};


export default NewGame;
