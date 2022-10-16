import TextField from "@mui/material/TextField";
import postRobot from "./CreateRobotApi";
import { ChangeEventHandler } from "react";
import "./CreateRobot.css";

function InputFile({ label }: any) {
  return (
    <div>
      <label className="label-file" htmlFor="robot-code">
        {" "}
        {label}{" "}
      </label>
      <input id="robot-code" name="robotCode" type="file" required />
    </div>
  );
}

const AvatarRobot = (): any => (
  <div id="avatar-view">
    <img id="robot-image" src="https://robohash.org/user1" alt="robotAvatar" />
  </div>
);

const ButtonChangeAvatar = (): any => {
  const handleChange = (e: any) => {
    const imageUpload: string = URL.createObjectURL(e.target.files[0]);
    const avatarImage = document.getElementById(
      "robot-image"
    ) as HTMLImageElement | null;
    avatarImage!.src = imageUpload;
  };

  return (
    <div className="div-image">
      <p className="botton-text">Subir una foto </p>
      <input
        name="avatarRobot"
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
    const data = new FormData(e.currentTarget);
    postRobot(data);
  };

  return (
    <div>
      <div id="bg-image"> </div>
      <form name="robotForm" className="robot-form" onSubmit={handleSubmit}>
        <AvatarRobot />
        <ButtonChangeAvatar />
        <TextField
          required
          name="robotName"
          label="Nombre del Robot"
          variant="standard"
          inputProps={{ maxLength: 12, minLength: 3 }}
        />
        <InputFile label="Archivo .py para el robot" />
        <input type="submit" value="Crear robot"></input>
      </form>
    </div>
  );
};

export default CreateRobot;
