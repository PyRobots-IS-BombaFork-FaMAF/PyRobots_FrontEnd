import { ListMatch } from "../listMatches/ListMatchesApi";

export type Player =
  | {
      game_id: number;
      robot: string;
      password: string;
    }
  | {
      game_id: number;
      robot: string;
    };

export type Robot = {
  id: number;
  name: string;
  code: File;
  avatar: File;
};

export const joinGame = (
  data: {
    row: {
      id: number;
      _current_players: number;
      _max_players: number;
      _status: string;
    };
  },
  robot: string,
  setActualMatch: Function,
  setIsCreator: Function,
  setMatches: Function,
  userName: string,
  setShowLobby: Function,
  matches: ListMatch
) => {
  const match = matches?.find((element) => element._id === data.row.id);
  const index = matches?.findIndex((o) => o._id === match?._id!);
  if (
    data.row._current_players < data.row._max_players ||
    data.row._status === "joined"
  ) {
    if (match?._creator !== userName) {
      setIsCreator(false);
      const players = match?._players;
      if (
        !players?.find((elem) => {
          return elem.player === userName;
        })
      ) {
        players?.push({
          player: userName,
          robot: robot,
        });
        if (players) {
          match._players = players;
          match._current_players = match._current_players + 1;
          match._status = "joined";
          matches[index] = match;
        }
        setMatches(matches);
      }
    } else {
      setIsCreator(true);
    }
    setShowLobby(true);
  } else {
    if (match && matches) {
      match._status = "full";
      matches[index] = match;
      setMatches(matches);
    }
  }
  setActualMatch(match);
};
