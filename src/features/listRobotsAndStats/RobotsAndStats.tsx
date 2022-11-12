import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import defaultRobot from "../../assets/img/defaultRobot.jpg";
import { Robot } from "./RobotsStatsApi";

type StatsProps = {
  robot: Robot;
};
export const RobotsAndStats = ({ robot }: StatsProps): JSX.Element => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 300,
        margin: 3,
        boxShadow: 6,
        border: "2px solid #43B647",
        "&:hover": { boxShadow: "0rem 0.5rem 1rem" },
      }}
    >
      <CardContent>
      <Box display="flex" justifyContent="center" alignItems="center" p={2} >
        <Avatar
            alt="Robot"
            src={defaultRobot}
            sx={{ height: "150px", width: "150px", border:"1px solid lightgray"}}
            />
      </Box>
        <Typography>
          <strong>Robot:</strong> {robot.name}
        </Typography>
        <Typography>
          <strong>Partidas Ganadas:</strong> {robot.wins}
        </Typography>
        <Typography>
          <strong>Partidas Perdidas:</strong> {robot.loses}
        </Typography>
        <Typography>
          <strong>Partidas Totales:</strong> {robot.loses + robot.wins}
        </Typography>
        <Typography>
          <strong>Porcentaje Victorias:</strong>{" "}
          {(robot.wins * 100) / (robot.wins + robot.loses)}
        </Typography>
      </CardContent>
    </Card>
  );
};
