import NavBar from "./NavBar";
import { CssBaseline, Paper } from "@mui/material";
import Image from '../../assets/Background.jpg';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  root: {
    padding: '8px',
    height: '100vh',
  },
  paper: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
  },
});


export default function Home(){

  const classes = useStyles();  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <div>
            <NavBar/>
          
        </div>
        
      </Paper>
    </div>
  )
}