import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';

import "../directories/Home.css"

type Props = {
    myKey : number,
    _name: string,
    _rounds: number,
    _games: number,
    _max_players: number,
    _is_private: boolean
  };

export function ItemMatch({myKey, _name, _rounds, _games, _max_players, _is_private} : Props) {
    return (
        
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <PersonIcon/> 0/{`${_max_players}`}
                </ListItemIcon>
                <ListItemText   primaryTypographyProps={{fontSize: '18px'}}  sx={{marginLeft: 4}} primary={`Nombre: ${_name}`}/>
                <ListItemText  primaryTypographyProps={{fontSize: '18px'}} sx={{marginLeft: 4}} primary={`Rondas: ${_rounds}` }/>
                <ListItemText  primaryTypographyProps={{fontSize: '18px'}} sx={{marginLeft: 4}} primary={`Juegos: ${_games}`}/>
                <ListItemText  primaryTypographyProps={{fontSize: '18px'}} sx={{marginLeft: 4}} primary={`Privado: ${_is_private}`}/>
                </ListItemButton>
            </ListItem>
    )
} 