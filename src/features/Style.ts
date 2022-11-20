import { SxProps, Theme } from "@mui/material";

export const Button_sx: SxProps<Theme> = {
  backgroundColor: "#43B647",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#43B647",
    boxShadow: "0rem 0.1rem 0.5rem #0d8f11",
  },
};
