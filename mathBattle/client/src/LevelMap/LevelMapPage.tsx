import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { ILevel } from "../Interfaces/ILevel";
import { LevelCard } from "./LevelCard";
import { NavBar } from "../NavBar";
import { useLevelMapService } from "./useLevelMapService";
import { useEffect, useState } from "react";
import { CalcType } from "../Interfaces/CalcType";
import { characters } from "../Interfaces/Characters";


export function LevelMapPage() {
  const getLevels = useLevelMapService();
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [calcType, setCalcType] = useState<CalcType>(CalcType.ADD);
  useEffect(() => {
    getLevels().then((result) => {
      if (result) setLevels(result);
    });
  }, []);

  function handleCalcTypeChange(event: any, value: any): void {
    setCalcType(value);
  }

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
            <Typography variant="h4">Pick a hero</Typography>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={calcType}
              exclusive
              color="primary"
              onChange={handleCalcTypeChange}
              aria-label="Your hero"
            >
              {
                [CalcType.ADD, CalcType.SUBTRACT, CalcType.MULTIPLICATE, CalcType.DIVIDE].map((calc : CalcType) => 
                  <ToggleButton value={calc} key="addition">
                  <img src={characters.get(calc)} style={{ maxHeight: "120px" }}></img>
                </ToggleButton>
                )
              }
              </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h4">Pick a battle</Typography>
          </Grid>
          {levels.map((level) => (
            <Grid  item xs={6} md={4} lg={3} xl={2}>
              <LevelCard {...level} calcType={calcType} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
