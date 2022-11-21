import { Button } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import swal from "sweetalert2";

import { emailValidationAPI, errorResponse } from "./emailValidationAPI";

function GoBackButtons(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
      <Button onClick={() => navigate("/register")}>Registrarse</Button>
    </div>
  );
}

function SuccessPage({ res }: { res: string }): JSX.Element {
  swal.fire({
    title: res,
  });
  return <Navigate to="/login" />;
}

function ErrorPage({ res }: { res: string }): JSX.Element {
  console.log(res);
  return (
    <div>
      <h1>Error</h1>
      <h2>{res}</h2>
      <GoBackButtons />
    </div>
  );
}

function InvalidArgumentsPage(): JSX.Element {
  return ErrorPage({ res: "Argumentos inválidos" });
}

function EmailValidationPage(): JSX.Element {
  const [searchParams, _] = useSearchParams();
  const [state, setState] = useState<
    | null
    | { state: "invalid arguments" }
    | { state: "success"; res: string }
    | { state: "error"; error: string }
  >(null);

  const email: string | null = searchParams.get("email");
  const code: string | null = searchParams.get("code");

  if (email === null || code === null) {
    if (state?.state !== "invalid arguments") {
      setState({ state: "invalid arguments" });
    }
  } else if (state === null) {
    const validation: Promise<AxiosResponse<string>> = emailValidationAPI({
      email: email,
      code: code,
    });

    validation
      .then((res) => {
        setState({ state: "success", res: res.data });
      })
      .catch((error: AxiosError<errorResponse>) => {
        console.log(error);
        setState({ state: "error", error: error.response?.data?.detail ?? "" });
      });
  }

  return state?.state === "invalid arguments" ? (
    <InvalidArgumentsPage />
  ) : state?.state === "success" ? (
    <SuccessPage res={state.res} />
  ) : state?.state === "error" ? (
    <ErrorPage res={state.error} />
  ) : (
    <div />
  );
}

export default EmailValidationPage;
