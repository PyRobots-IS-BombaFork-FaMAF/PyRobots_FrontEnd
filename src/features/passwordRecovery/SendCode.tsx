import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export const SendCode = () => {
  return (
    <Container>
      <TextField
        margin="normal"
        data-testid="pass"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoComplete="off"
        autoFocus
      />
      <TextField
        margin="normal"
        data-testid="pass"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        autoComplete="off"
        autoFocus
      />
      <TextField
        margin="normal"
        data-testid="pass"
        required
        fullWidth
        id="codigo"
        label="Codigo"
        name="codigo"
        autoComplete="off"
        autoFocus
      />
      <Button
        data-testid="submit"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#43B647",
          "&:hover": {
            backgroundColor: "#43B647",
            boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
          },
        }}
      >
        Cambiar Contraseña
      </Button>
    </Container>
  );
};
