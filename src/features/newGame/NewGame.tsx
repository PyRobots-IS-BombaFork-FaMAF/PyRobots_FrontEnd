import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type newGameInfo = {
  rounds?: number,
  games?: number,
  name: string,
  max_players?: number,
  min_players?: number
}

function onSubmit_newGame(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data: FormData = new FormData(event.currentTarget)

  // pattern guarantees that all formats are correct

  const newGameInfo: newGameInfo = {
    name: data.get('game-name') as string
  }

  const rounds = data.get('rounds-amount')
  if (typeof(rounds) === 'string') {
    newGameInfo.rounds = parseInt(rounds)
  }

  const games = data.get('games-amount')
  if (typeof(games) === 'string') {
    newGameInfo.games = parseInt(games)
  }

  const max_players = data.get('max-players')
  if (typeof(max_players) === 'string') {
    newGameInfo.max_players = parseInt(max_players)
  }

  const min_players = data.get('min-players')
  if (typeof(min_players) === 'string') {
    newGameInfo.min_players = parseInt(min_players)
  }

  console.log(newGameInfo)

}


function GameForm() {
  return (
  <Container>
    <Box component="form" onSubmit={onSubmit_newGame} >
      <Grid>
        <TextField required
          name="game-name" label="Nombre" variant="standard" helperText="Entre 3 y 12 caracteres"
          type="text" inputProps={{ maxLength:12, pattern: "^.{3,12}$" }}
        />
      </Grid>
      <Grid>
        <TextField required
          name="games-amount" label="Cantidad de simulaciones" variant="standard" helperText="Entre 1 y 200"
          defaultValue="200" type="text" inputProps={{ maxLength: 3, pattern: "^([1-9][0-9]?|1[0-9]{2}|200)$" }}
        />
      </Grid>
      <Grid>
        <TextField required
          name="rounds-amount" label="Cantidad de rondas" variant="standard" helperText="Entre 1 y 10000"
          defaultValue="10000" type="text" inputProps={{ maxLength: 5, pattern: "^([1-9][0-9]{0,3}|10000)$" }}
        />
      </Grid>
      <Grid>
        <TextField required
          name="max-players" label="Máximo de jugadores" variant="standard" helperText="Entre 2 y 4"
          defaultValue="4" type="text" inputProps={{ maxLength: 1, pattern: "^[2-4]$" }}
        />
      </Grid>
      <Grid>
        <TextField required
          name="min-players" label="Mínimo de jugadores" variant="standard" helperText="Entre 2 y 4"
          defaultValue="2" type="text" inputProps={{ maxLength: 1, pattern: "^[2-4]$" }}
        />
      </Grid>
      <Grid>
        <TextField
          name="password" label="Contraseña" variant="standard" helperText="Entre 8 y 16 caracteres"
          type="text" inputProps={{ maxLength: 16, pattern: "^(.{8,16}|)$" }}
        />
      </Grid>
      <Button
        type="submit"
        role="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Crear Partida
      </Button>
    </Box>
  </Container>
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
