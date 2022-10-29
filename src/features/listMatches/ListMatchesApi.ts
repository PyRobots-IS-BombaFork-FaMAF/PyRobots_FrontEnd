import axios from "../../api/axios";
import swal from "sweetalert2";

export type ListMatchesFilter = {
  game_name?: string;
  game_creation_date?: string; // Formato "año-mes-díaT__:__:__Z" donde los __ son de hora, minuto y segundo, pero no se usan
  created_by_user?: boolean;
  only_private?: boolean; // En true solo devuelve las privadas, en false solo las publicas y si no todas
};

export type Match = {
  _id: number;
  _name: string;
  _rounds: number;
  _games: number;
  _max_players: number;
  _min_players: number;
  _creator: string;
  _players : {robot: string};
  _creation_date: string; // Formato "año-mes-día hora:minuto:segundo"
  _password: string; // No es la contraseña real, si no un hash irreversible
  _private: boolean;
};

export type ListMatch = Array<Match>;

export async function listMatchesApi(
  filters: ListMatchesFilter,
  access_token: string
): Promise<ListMatch> {
  return new Promise((resolve, reject) => {
    axios
      .post("game/list", filters, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return resolve(response.data);
      })
      .catch(function (error: any) {
        swal.fire({
          title: "Error",
          text: error.response.data.detail,
          icon: "error",
          confirmButtonColor: "#43B647",
        });
        if (error.response.status === 401) {
          localStorage.clear();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  });
}
