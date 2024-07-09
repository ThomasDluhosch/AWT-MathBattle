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
              <ToggleButton value={CalcType.ADD} key="addition">
                <img src="/characters/Addition_Knight.svg" style={{ maxHeight: "120px" }}></img>
              </ToggleButton>
              <ToggleButton value={CalcType.SUBTRACT} key="substract">
                <img src="/characters/Subtraction_Knight.svg" style={{ maxHeight: "120px" }}></img>
              </ToggleButton>
              <ToggleButton value={CalcType.MULTIPLICATE} key="mult">
                <img src="/characters/Multiplication_Knight.svg" style={{ maxHeight: "120px" }}></img>
              </ToggleButton>
              <ToggleButton value={CalcType.DIVIDE} key="divide">
                <img src="/characters/Division_Knight.svg" style={{ maxHeight: "120px" }}></img>
              </ToggleButton>
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
