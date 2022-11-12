import { CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../directories/NavBar";
import { ListRobots, Robot, RobotsStatsApi } from "./RobotsStatsApi";
import { RobotsAndStats } from "./RobotsAndStats";



export const RobotLibrary = () => {
  
    const [robots, setRobots] = useState<ListRobots>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [robotsPerPage] = useState<number>(12);
    const access_token = localStorage.getItem("access_token")?.toString();
    
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    };

    useEffect(() => {
        setRobots(RobotsStatsApi(access_token!, setLoading));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    // get current robots
    const indexOfLastRobot = currentPage * robotsPerPage;
    const indexOfFirstRobot = indexOfLastRobot - robotsPerPage;
    const currentRobot = robots?.slice(indexOfFirstRobot, indexOfLastRobot);
    return loading ? (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    ) : (
      <div>
        <NavBar />
          {currentRobot.length > 0 ? (
            <div>
              <Grid container sx={{ display: "flex", justifyContent: "center", mt: 5}}>
                {currentRobot.map((robot: Robot, index: number) => (
                  <Grid key={index}>
                      <RobotsAndStats
                        robot = {robot}
                      />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                variant="outlined"
                onChange={handleChange}
                count={Math.ceil(robots.length / robotsPerPage)}
              />
            </div>
          ) : (
            <Typography variant="h5" sx={{ mt: "15px" }}>
              No has creado robots aun
            </Typography>
          )}
      </div>
    );
  };
  


  