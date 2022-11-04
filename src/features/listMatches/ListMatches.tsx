import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { ListMatch, callApiListMatch } from "./ListMatchesApi";
import { CssBaseline, SelectChangeEvent } from "@mui/material";
import NavBar from "../directories/NavBar";
import "../directories/Home.css";
import { useEffect, useState } from "react";
import { Lobby } from "../joinGame/Lobby";
import { joinGame, Player, Robot } from "../joinGame/JoinGame";
import { callApiListRobot } from "../robotApi/ListRobotApi";
import { JoinGameApi } from "../joinGame/JoinGameApi";
import { Match } from "./ListMatchesApi";
import swal from "sweetalert2";
import { MatchesDataGrid } from "./MatchesDataGrid";
import { ModalList } from "./ModalList";

export default function ListMatches(): JSX.Element {
  const [matches, setMatches] = useState<ListMatch>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [open, setOpen] = useState(false);
  const [showLobby, setShowLobby] = useState(false);
  const [actualMatch, setActualMatch] = useState<Match | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [robotIndex, setRobotIndex] = useState("");
  const [arrRobot, setArrRobot] = useState<Robot[]>([]);
  const [row, setRow] = useState<any>({});
  const [error, setError] = useState("");

  const handleSubmitJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (row.status !== "joined") {
      if (robotIndex !== "") {
        if (arrRobot[+robotIndex]) {
          const player: Player = {
            game_id: row.id,
            robot: arrRobot[+robotIndex].name,
            password: data.get("password")?.toString()!,
          };
          setError(
            await JoinGameApi(
              player,
              localStorage.getItem("access_token")?.toString()!,
              handleClose
            )
          );
        }
      } else {
        handleClose();
        swal.fire(
          "Error",
          "Debe elegir un robot o crear uno si no lo tiene",
          "warning"
        );
      }
    }
  };

  useEffect(() => {
    if (error === "Not Error") {
      handleClose();
      setError("");
      joinGame(
        row,
        arrRobot[+robotIndex].name,
        setActualMatch,
        setIsCreator,
        setMatches,
        localStorage.getItem("username")?.toString()!,
        setShowLobby,
        setSocket,
        matches
      );
    }
  }, [error, showLobby, matches, row, arrRobot, robotIndex]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e: SelectChangeEvent) => {
    setRobotIndex(e.target.value as string);
  };

  useEffect(() => {
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmitMatches = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    callApiListMatch({}, setMatches);
    callApiListRobot(setArrRobot);
  };

  return (
    <div>
      <NavBar />
      <div className="bg-image">
        <Container component="main">
          <CssBaseline />
          <Box
            component="form"
            data-testid="formList"
            onSubmit={handleSubmitMatches}
            noValidate
            id="my-form"
          />
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 20,
          }}
        >
          {matches.length > 0 && !showLobby ? (
            <Box
              sx={{
                height: "60vh",
                width: 1250,
                maxWidth: "90vw",
                bgcolor: "background.paper",
                borderRadius: "5%",
                border: "solid 2px",
                borderColor: "#43B647",
                "& .columnClass": {
                  backgroundColor: "#43B647",
                },
                "& .joined": {
                  backgroundColor: "#9BD87A",
                },
                "& .notJoined": {
                  backgroundColor: "white",
                },
                "& .full": {
                  backgroundColor: "#EF4040",
                },
              }}
            >
              <MatchesDataGrid
                matches={matches}
                setRow={setRow}
                arrRobot={arrRobot}
                robotIndex={robotIndex}
                setActualMatch={setActualMatch}
                setIsCreator={setIsCreator}
                setMatches={setMatches}
                setShowLobby={setShowLobby}
                setSocket={setSocket}
                handleOpen={handleOpen}
              />
              <Container>
                <ModalList
                  open={open}
                  handleSubmitJoin={handleSubmitJoin}
                  robotIndex={robotIndex}
                  handleChange={handleChange}
                  handleClose={handleClose}
                  arrRobot={arrRobot}
                />
              </Container>
            </Box>
          ) : showLobby && actualMatch ? (
            <Lobby
              myKey={0}
              players={actualMatch?._players!}
              setShowLobby={setShowLobby}
              roomId={actualMatch?._id.toString()}
              isCreator={isCreator}
              setMatches={setMatches}
              socket={socket}
            />
          ) : (
            <div/>
          )}
        </Container>
      </div>
    </div>
  );
}
