import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function GameForm() {
  return (
    <form>
      <Grid>
        <TextField required id="game-name" label="Nombre" variant="standard" helperText="Entre 3 y 12 caracteres" />
      </Grid>
      <Grid>
        <TextField id="games-amount" label="Cantidad de simulaciones" variant="standard" helperText="Entre 1 y 200" />
      </Grid>
      <Grid>
        <TextField id="rounds-amount" label="Cantidad de rondas" variant="standard" helperText="Entre 1 y 10000" />
      </Grid>
      <Grid>
        <TextField id="max-players" label="Máximo de jugadores" variant="standard" helperText="Entre 2 y 4" />
      </Grid>
      <Grid>
        <TextField id="min-players" label="Mínimo de jugadores" variant="standard" helperText="Entre 2 y 4" />
      </Grid>
      <Grid>
        <TextField id="password" label="Contraseña" variant="standard" helperText="Entre 8 y 16 caracteres" />
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

  return (
    <Container>
      <div>
        <h1>Crear partida</h1>
        <GameForm />
      </div>
    </Container>
  );
};


export default NewGame;
