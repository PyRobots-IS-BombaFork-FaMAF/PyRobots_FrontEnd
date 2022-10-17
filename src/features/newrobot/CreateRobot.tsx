import TextField from "@mui/material/TextField";
import postRobot, { RobotData } from "./CreateRobotApi";
import "./CreateRobot.css";
import { isValidRobotName } from "./CreateRobotUtils";

function InputFile({ label }: { label: string }) {
  return (
    <div>
      <label className="label-file" htmlFor="robot-code">
        {" "}
        {label}{" "}
      </label>
      <input required data-testid="robotCode" id="robot-code" name="code" type="file" />
    </div>
  );
}

const AvatarRobot = () => (
  <div id="avatar-view" data-testid="avatarView">
    <img id="robot-image" data-testid="avatarImage" src="https://robohash.org/user1" alt="Avatar del robot" />
  </div>
);

const ButtonChangeAvatar = () => {
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
};

const CreateRobot = () => {
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
      <form name="robotForm" className="robot-form" onSubmit={handleSubmit}>
        <AvatarRobot />
        <ButtonChangeAvatar />
        <TextField
          required
          name="name"
          label="Nombre del Robot"
          variant="standard"
          inputProps={{ maxLength: 12, minLength: 3 }}
          data-testid="robotName"
        />
        <InputFile label="Archivo .py para el robot" />
        <input type="submit" value="Crear robot"></input>
      </form>
    </div>
  );
};

export default CreateRobot;
