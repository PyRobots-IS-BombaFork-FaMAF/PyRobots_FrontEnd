import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { Match } from "./ListMatchesApi";

import "../directories/Home.css";

export function ItemMatch({ myKey, match }: { myKey: number; match: Match }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon /> 0/{`${match._max_players}`}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "18px" }}
          sx={{ marginLeft: 4 }}
          primary={`Nombre: ${match._name}`}
        />
        <ListItemText
          primaryTypographyProps={{ fontSize: "18px" }}
          sx={{ marginLeft: 4 }}
          primary={`Rondas: ${match._rounds}`}
        />
        <ListItemText
          primaryTypographyProps={{ fontSize: "18px" }}
          sx={{ marginLeft: 4 }}
          primary={`Juegos: ${match._games}`}
        />
        <ListItemText
          primaryTypographyProps={{ fontSize: "18px" }}
          sx={{ marginLeft: 4 }}
          primary={`Privado: ${match._private}`}
        />
      </ListItemButton>
    </ListItem>
  );
}
