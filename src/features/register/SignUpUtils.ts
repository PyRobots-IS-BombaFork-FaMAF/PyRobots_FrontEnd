export const isValidEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const isValidPassword = (password: string) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*.;:",?]{8,}$/.test(
    password
  );
};
export const isValidUserName = (username: string) => {
  return /^[A-Za-z][A-Za-z0-9_]{7,22}$/.test(
    username
  );
};
