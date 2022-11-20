import { Button } from "@mui/material";
import { useState } from "react";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { emailValidationAPI } from "./emailValidationAPI";

function GoBackButtons(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login", { replace: true })}>
        Iniciar sección
      </Button>
      <Button onClick={() => navigate("/register", { replace: true })}>
        Registrarse
      </Button>
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
  return (
    <div>
      <h1>Cuenta validada correctamente</h1>
      <GoBackButtons />
    </div>
  );
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
    null | "invalid arguments" | "waiting" | "success" | "error"
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
    setState("waiting");

    validation
      .then(() => {
        setState("success");
      })
      .catch((error) => {
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
