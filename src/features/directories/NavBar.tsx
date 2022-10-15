import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="left">
            PyRobots
          </Typography>
          <Button sx={{ mr: 5 }} color="inherit">Crear Robot</Button>
          <Button sx={{ mr: 5 }} color="inherit">Ejecutar Simulacion</Button>
          <Button sx={{ mr: 5 }} color="inherit">Crear Partida</Button>
          <Button sx={{ mr: 5 }} color="inherit">Listar Partidas</Button>
          <Button sx={{ mr: 5 }} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}