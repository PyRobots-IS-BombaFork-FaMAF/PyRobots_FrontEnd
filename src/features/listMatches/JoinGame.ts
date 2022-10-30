import { ListMatch } from "./ListMatchesApi";
import { JoinGameApi } from "./JoinGameApi";
import { initSocket, message } from "../../websocket/WebSocket";

export type Player = {
  game_id: number;
  robot: string;
  password: string;
};

export const joinGame = (
  data: any,
  setActualLobby: Function,
  setRoom: Function,
  setIsCreator: Function,
  setMatches: Function,
  setShowLobby: Function,
  setSocket: Function,
  matches: ListMatch,
  socket: WebSocket,
  room: string
) => {
  // Como las listas funcionan desde 0, matches necesita ser indexado con -1, pero las partidas se manejan de 1 en adelante.
  const player: Player = {
    game_id: data.row.id,
    robot: "hola",
    password: "",
  };
  if (data.row._status !== "joined") {
    JoinGameApi(player, localStorage.getItem("access_token")?.toString()!);
  }
  if (
    data.row._current_players < data.row._max_players ||
    data.row._status === "joined"
  ) {
    const key = data.row.id - 1;
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
      }
      setMatches(
        matches.map((elem: any, id) => {
          if (id === key) {
            return {
              ...elem,
              _players: players,
              _current_players: elem._current_players + 1,
            };
          } else {
            return elem;
          }
        })
      );
    } else {
      setRoom(matches[key]._websocketurl);
      setIsCreator(true);
    }
    const game = room;
    setShowLobby(true);

    if (!socket) {
      setSocket(initSocket(game));
    } else {
      message(socket);
      socket.close();
    }
  }
};
