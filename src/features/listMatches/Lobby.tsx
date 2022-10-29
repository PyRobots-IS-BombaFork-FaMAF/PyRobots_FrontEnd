import Avatar from '@mui/material/Avatar';
import { Button, Container, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

type Props = {
    myKey : number,
    players: [{
        player: string,
        robot: string,
        avatarPlayer: string,
        avatarRobot: string
    }],
  };

export const Lobby = ({myKey, players} : Props) => {
    return(
        <Container key={myKey}>
            <Paper elevation={3} sx={{width: "40vw", heigth:"50vh"}}>
                <Stack spacing={2} sx={{ml: 25, mt: 1}}>
                    { players.map((player : any, key : number) : any => {
                        return (
                            <Stack direction="row" spacing={4} key={key}>
                                <Avatar alt="Player"   src={player.avatarPlayer} sx={{ height: '100px', width: '100px' }}/> 
                                <Typography variant="h5"> {player.player} </Typography>
                                <Avatar alt="Robot" src={player.avatarRobot} sx={{ height: '100px', width: '100px' }}/>
                                <Typography variant="h5">{player.robot} </Typography>
                            </Stack>  
                        )
                    })
                    }
                </Stack>
                <Stack direction="row" spacing={5} sx={{ml: 25}}>
                    <Button>Ir a listar partidas</Button>
                    <Button>Abandonar Partida</Button>
                </Stack>
            </Paper>

            
        </Container>
    )
}

