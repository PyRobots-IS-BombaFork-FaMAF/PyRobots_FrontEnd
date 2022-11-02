import { ListMatch } from "../listMatches/ListMatchesApi";
import { initSocket } from "../../websocket/WebSocket";

export type Player = {
  game_id: number;
  robot: string;
  password: string;
} | {
  game_id: number;
  robot: string;
};

export type Robot = {
  id: number,
  name: string,
  code : File,
  avatar : File
}



export const joinGame = (
  data: any,
  robot: string,
  setActualMatch: Function,
  setIsCreator: Function,
  setMatches: Function,
  setShowLobby: Function,
  setSocket: Function,
  matches: ListMatch,
) => {
  const match = matches?.find(element => element._id === data.row.id);
  if ( 
      data.row._current_players < data.row._max_players ||
      data.row._status === "joined"
    ) {
      
      if (match?._creator !== localStorage.getItem("username")) {
        setIsCreator(false);
        const players = match?._players;
        if (
          !players?.find((elem) => {
            return elem.player === localStorage.getItem("username")?.toString()!;
          })
        ) {
          players?.push({
            player: localStorage.getItem("username")?.toString()!,
            robot : robot
          });
          setMatches(
            matches.map((elem: any, id) => {
              if (id === match?._id) {
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
      setShowLobby(true);
      const socket = initSocket(match?._websocketurl!);
      setSocket(socket);
    }else{
      setMatches(
        matches.map((elem: any, id) => {
          if (id === match?._id) {
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
    setActualMatch(match);
};
