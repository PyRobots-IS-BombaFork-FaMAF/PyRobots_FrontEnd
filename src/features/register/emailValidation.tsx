import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { emailValidationAPI } from "./emailValidationAPI";

function InvalidArgumentsPage(): JSX.Element {
  return <h1>Argumentos inválidos</h1>;
}

function SuccessPage(): JSX.Element {
  return <h1>Cuenta validada correctamente</h1>;
}

function ErrorPage(): JSX.Element {
  return <h1>Email o código incorrectos</h1>;
}

function EmailValidationPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<
    null | "invalid arguments" | "success" | "error"
  >(null);

  const email: string | null = searchParams.get("email");
  const code: string | null = searchParams.get("code");

  if (email === null || code === null) {
    setState("invalid arguments");
  } else {
    const validation: Promise<void> = emailValidationAPI({
      email: email,
      code: code,
    });

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
