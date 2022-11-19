import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SendEmail } from "./SendEmail";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { SendCode } from "./SendCode";
import KeyIcon from "@mui/icons-material/Key";
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { callApiGetCode, userPassRecover, sendCodeAndPasswordApi} from "./passRecoverApi";

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        pyrobots.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function PassRecover(): JSX.Element {
  const [emailSent, setEmailSent] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  
  if (!emailSent) {
    const usern = data.get("username") as string;
    if(usern !== ""){
      callApiGetCode(usern, setEmailSent);
      setUsername(usern);
    }
  } else {
    if (data.get("confirmPassword") === data.get("password")) {
      const code = data.get("codigo") as string;
      if(code !== ""){
        const user : userPassRecover = {
          username: username as string,
          code: data.get("codigo") as string,
          password: data.get("password") as string
        }
        sendCodeAndPasswordApi(user, navigate);
      }else{
        swal.fire({
          title: "Error",
          text: "El campo para el codigo no puede estar vacio",
          icon: "error",
          confirmButtonColor: "#43B647",
        });
      }
    } else {
      swal.fire({
        title: "Error",
        text: "Las contraseñas deben coincidir",
        icon: "error",
        confirmButtonColor: "#43B647",
      });
    }
  } 
  
    
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <KeyIcon />
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {emailSent ? <SendCode /> : <SendEmail />}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
        <Grid container>
        <Grid item xs>
          <Link href="/login" variant="body2" data-testid="goToLogin">
            Ir a Iniciar Sesión
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" variant="body2" data-testid="goToRegister">
            {"¿No tienes cuenta? Registrate"}
          </Link>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}
