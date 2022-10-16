import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';

import "../directories/Home.css"

type Props = {
    myKey : number,
    name: string,
    rounds: number,
    games: number,
    max_players: number,
    is_private: boolean
  };

export function ItemMatch({myKey, name, rounds, games, max_players, is_private} : Props) {
    return (
        <div className="">
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <PersonIcon/> 0/{`${max_players}`}
                </ListItemIcon>
                <ListItemText sx={{marginLeft: 4}} primary={`Nombre: ${name}`}/>
                <ListItemText  sx={{marginLeft: 4}} primary={`Rondas: ${rounds}` }/>
                <ListItemText  sx={{marginLeft: 4}} primary={`Juegos: ${games}`}/>
                <ListItemText  sx={{marginLeft: 4}} primary={`Privado: ${is_private}`}/>
                </ListItemButton>
            </ListItem>
        </div>
    )
} 