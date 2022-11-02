import TextField from "@mui/material/TextField";
import { postRobot } from "./CreateRobotApi";
import "./CreateRobot.css";
import { isValidRobotName } from "./CreateRobotUtils";
import NavBar from "../directories/NavBar";
import { Button } from "@mui/material";

function InputFile({ label }: { label: string }): JSX.Element {
  return (
    <div>
      <label className="label-file" htmlFor="robot-code">
        {" "}
        {label}{" "}
      </label>
      <input
        required
        data-testid="robotCode"
        id="robot-code"
        name="code"
        type="file"
      />
    </div>
  );
}

export function AvatarRobot(): JSX.Element {
  return (
    <div id="avatar-view" data-testid="avatarView">
      <img
        id="robot-image"
        data-testid="avatarImage"
        src="https://robohash.org/user1"
        alt="Avatar del robot"
      />
    </div>
  );
}

function ButtonChangeAvatar(): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = e.target.files?.item(0);
    if (file !== null && file !== undefined) {
      const imageUpload: string = URL.createObjectURL(file);
      const avatarImage = document.getElementById(
        "robot-image"
      ) as HTMLImageElement | null;
      if (avatarImage !== null) {
        avatarImage.src = imageUpload;
      }
    }
  };

  return (
    <div className="div-image">
      <p className="botton-text">Subir una foto </p>
      <input
        name="avatar"
        data-testid="robotAvatar"
        onChange={handleChange}
        className="input-avatar"
        type="file"
      />
    </div>
  );
}




function CreateRobot(): JSX.Element {
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = new FormData(e.currentTarget);
    if (isValidRobotName(data.get("name")?.toString()!)) {
      postRobot(data);
    }
  };



  return (
    <div>
      <div id="bkg-image"> </div>
      <div className="navBar">
        <NavBar />
      </div>
      <form name="robotForm" className="form" onSubmit={handleSubmit}>
        <h1> Crear robot </h1>
        <AvatarRobot />
        <ButtonChangeAvatar />
        <TextField
          required
          name="name"
          label="Nombre del Robot"
          variant="standard"
          inputProps={{
            maxLength: 12,
            minLength: 3,
            "data-testid": "robotName",
          }}
          sx={{
            backgroundColor: "#f2f2f2",
          }}
        />
        <InputFile label="Archivo .py para el robot" />
        <Button
          type="submit"
          role="button"
          variant="contained"
          data-testid="submit-robot"
          sx={
            {
              mt: 1,
              mb: 1,
              width: "100%",
              backgroundColor: "#43B647",
              "&:hover": { backgroundColor: "#43B647", boxShadow: "0rem 0.1rem 0.5rem #0d8f11" }
            }
          }
        >
          Crear Robot
        </Button>
      </form>
    </div>
  );
}

export default CreateRobot;
