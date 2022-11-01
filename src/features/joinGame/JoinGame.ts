import { ListMatch } from "../listMatches/ListMatchesApi";
import { initSocket, message } from "../../websocket/WebSocket";

export type Player = {
  game_id: number;
  robot: string;
  password: string;
};

export type Robot = {
  id: number,
  name: string,
  code : File,
  avatar : File
}



export const joinGame = async (
  data: any,
  setActualLobby: Function,
  setRoom: Function,
  setIsCreator: Function,
  setMatches: Function,
  setShowLobby: Function,
  setSocket: Function,
  matches: ListMatch,
  room: string
) => {
  // Como las listas funcionan desde 0, matches necesita ser indexado con -1, pero las partidas se manejan de 1 en adelante.
  const key = data.row.id - 1;
  if ( 
      data.row._current_players < data.row._max_players ||
      data.row._status === "joined"
    ) {
      
      setActualLobby(key);
      if (matches[key]._creator !== localStorage.getItem("username")) {
        setRoom(matches[key]._websocketurl);
        setIsCreator(false);
        const players = matches[key]._players;
        if (
          !players.find((elem) => {
            return elem.player === localStorage.getItem("username")?.toString()!;
          })
        ) {
          players.push({
            player: localStorage.getItem("username")?.toString()!,
            robot: "hola",
          });
          setMatches(
            matches.map((elem: any, id) => {
              if (id === key) {
                return {
                  ...elem,
                  _players: players,
                  _current_players: elem._current_players + 1,
                  _status : "joined"
                };
              } else {
                return elem;
              }
            })
          );
        }
      } else {
        setIsCreator(true);
      }
      setRoom(matches[key]._websocketurl);
      console.log(room);
      const game = room;
      setShowLobby(true);
      const socket = initSocket(game);
      setSocket(socket);
      console.log(socket);
      if(socket){
        message(socket);
      }
    }else{
      setMatches(
        matches.map((elem: any, id) => {
          if (id === key) {
            return {
              ...elem,
              _status : "full"
            };
          } else {
            return elem;
          }
        })
      );
    } 
};
