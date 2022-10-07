export function validateEmpty(
  password: any,
  email: any,
  username: any
): null | string {
  if (password !== "" && email !== "" && username !== "") {
    return "Please fill requiered fields";
  } else {
    return null;
  }
}
export function validateChange(name: string, value: string): any {
  const isValidEmail = (email: any) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  };

  const isValidPassword = (password: any) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  };
  const isValidUserName = (username: string) => {
    return username.length < 20;
  };
  switch (name) {
    case "email":
      return !isValidEmail(value) && value !== "" ? "Email is invalid" : null;
    case "password":
      return !isValidPassword(value) && value !== ""
        ? "Password is invalid"
        : null;
    case "userName":
      return !isValidUserName(value) && value !== ""
        ? "Username is invalid"
        : null;
    default:
  }
}
