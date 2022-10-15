import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";


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
      <input type="submit" value="Crear robot"></input>
    </form>
  );
};


function NewGame() {
  return (
    <div>
      <h1>Crear juego</h1>
      <GameForm />
    </div>
  );
};


export default NewGame;
