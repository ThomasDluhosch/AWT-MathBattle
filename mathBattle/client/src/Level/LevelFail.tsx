import { Typography, Box, Button, Grid, Icon, ToggleButtonGroup, ToggleButton, Container } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";
import { CalcType } from "../Interfaces/CalcType";
import { useState } from "react";
import { characters } from "../Interfaces/Characters";
import { HeroSelect } from "../Reusables/HeroSelect";

export function LevelFail() {
  const levelId = useLevelId();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const calcType: CalcType = type ? parseInt(type) : 0;
  const [curCalcType, setCalcType] = useState(calcType);
  const returnToMap = () => {
    navigate("/");
  };
  const retry = () => {
    navigate("/level/" + levelId + "?type=" + curCalcType)
  };

  return (
    <div>
      <NavBar />

      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h1">You failed!</Typography>

            <Typography variant="h6">
              OH NO!! You couldn't fend off the monster; it invaded your castle.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <HeroSelect calcType={curCalcType} onChange={setCalcType}></HeroSelect>
          </Grid>
          <Grid display="flex" justifyContent="center" gap={3} item xs={12}>
            <Button variant="outlined"
              startIcon={<Icon>home</Icon>}
              onClick={returnToMap}>
              Main Menu
            </Button>
            <Button variant="contained"
              startIcon={<Icon>repeat</Icon>}
              onClick={retry}>
              TRY AGAIN
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
