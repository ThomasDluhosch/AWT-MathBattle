import { Typography, Box, Button, Grid, Icon } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";
import { useLevelId } from "./useLevelId";

export function LevelFail() {
  const levelId = useLevelId();
  const navigate = useNavigate();
  const returnToMap = () => {
    navigate("/map");
  };
  const retry = () => {
    navigate("/level/" + levelId)
  };
  return (
    <div>
      <NavBar />

      <Box textAlign="center" sx={{ m: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h1">YOU FAILED!</Typography>

            <Typography variant="h6">
              OH NO!! You couldn't fend off the monster; it invaded your castle.
            </Typography>
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
      </Box>
    </div>
  );
}
