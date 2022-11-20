import { Button } from "@mui/material";
import { useState } from "react";
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import swal from "sweetalert2";

import { emailValidationAPI } from "./emailValidationAPI";

function GoBackButtons(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
      <Button onClick={() => navigate("/register")}>Registrarse</Button>
    </div>
  );
}

function InvalidArgumentsPage(): JSX.Element {
  return (
    <div>
      <h1>Argumentos inválidos</h1>
      <GoBackButtons />
    </div>
  );
}

function SuccessPage(): JSX.Element {
  swal.fire({
    title: "Cuenta validada correctamente",
  });
  return <Navigate to="/login" />;
}

function ErrorPage(): JSX.Element {
  return (
    <div>
      <h1>Email o código incorrectos</h1>
      <GoBackButtons />
    </div>
  );
}

function EmailValidationPage(): JSX.Element {
  const [searchParams, _] = useSearchParams();
  const [state, setState] = useState<
    null | "invalid arguments" | "success" | "error"
  >(null);

  const email: string | null = searchParams.get("email");
  const code: string | null = searchParams.get("code");

  if (email === null || code === null) {
    if (state !== "invalid arguments") {
      setState("invalid arguments");
    }
  } else if (state === null) {
    const validation: Promise<void> = emailValidationAPI({
      email: email,
      code: code,
    });

    validation
      .then(() => {
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  }

  return state === "invalid arguments" ? (
    <InvalidArgumentsPage />
  ) : state === "success" ? (
    <SuccessPage />
  ) : state === "error" ? (
    <ErrorPage />
  ) : (
    <div />
  );
}

export default EmailValidationPage;
