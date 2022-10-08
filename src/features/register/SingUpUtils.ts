function validateData(
    name: string,
    value: string | FormDataEntryValue | null,
    isValid: Function
  ) {
    return value === "" || !isValid(value) ? `${name} is invalid` : null;
  }
  
export function validateChange(
    name: string,
    value: string | FormDataEntryValue | null
  ): any {
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
        return validateData("Email", value, isValidEmail);
      case "password":
        return validateData("Password", value, isValidPassword);
      case "userName":
        return validateData("Username", value, isValidUserName);
      default:
    }
  }