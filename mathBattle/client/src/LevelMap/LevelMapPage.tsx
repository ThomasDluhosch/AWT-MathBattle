import {
  Box,
  Grid,
  Typography
} from "@mui/material";
import { ILevel } from "../Interfaces/ILevel";
import { LevelCard } from "./LevelCard";
import { NavBar } from "../NavBar";
import { useLevelMapService } from "./useLevelMapService";
import { useEffect, useState } from "react";


export function LevelMapPage() {
  const getLevels = useLevelMapService();
  const [levels, setLevels] = useState<ILevel[]>([]);
  useEffect(() => {
    getLevels().then((result) => {
      if (result) setLevels(result);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <Box textAlign="center" sx={{ m: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">
              Welcome {localStorage.getItem("username")}
            </Typography>
            <br />
            <Typography variant="h4">Pick a level</Typography>
            <br />
          </Grid>
          {levels.map((level) => (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <LevelCard {...level} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
