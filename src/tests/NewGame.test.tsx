import {
  game_name_regex, 
  games_amount_regex, 
  rounds_amount_regex, 
  max_players_regex, 
  min_players_regex, 
  password_regex
} from "../features/newGame/NewGame";

describe("Funcionalidades en `NewGame`", () => {
  describe("Regex de nombre del juego", () => {

    const regex = new RegExp(game_name_regex);
    
    const valid_names = [
      "aaa",
      "aaaa",
      "aaaaa",
      "aaaaaa",
      "αβγ",
      // to do
    ]



  })
})

