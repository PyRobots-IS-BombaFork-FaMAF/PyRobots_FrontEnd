import TextField from "@mui/material/TextField";
import "./CreateRobot.css";

  const handleChange = (e: any) => {
    console.log(e);
  }

function InputFile({ idName, label }: any) {
  return (
    <div>
      <label className="label-file" htmlFor={idName}>
        {" "}
        {label}{" "}
      </label>
      <input id={idName} type="file" required />
    </div>
  );
}

const AvatarRobot = (): any => (
  <img className="avatar" src="https://robohash.org/user1" alt="robotAvatar" />
);

const ButtonChangeAvatar = (): any => (
  <div className="div-image">
    <p className="botton-text">Subir una foto </p>
    <input className="input-avatar" type="file" onChange={handleChange} />
  </div>
);

const RobotForm = (): any => (
  <form className="robot-form">
    <AvatarRobot />
    <ButtonChangeAvatar />
    <TextField required id="robot-name" label="Nombre del Robot" variant="standard" />
    <InputFile idName="robot-code" label="Archivo .py para el robot" />
    <input type="submit" value="Crear robot"></input>
  </form>
);

const CreateRobot = () => {

  return (
    <div>
      <div id="bg-image"> </div>
      <RobotForm />
    </div>
  );
};

export default CreateRobot;
