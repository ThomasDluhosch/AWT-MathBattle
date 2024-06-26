import { Typography, Box, Button, Grid } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";

export function LevelFail() {
  const navigate = useNavigate();
  const returnToMap = () => {
    navigate("/map");
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
            <Button size="large" variant="outlined" onClick={returnToMap}>
              Main Menu
            </Button>
            <Button size="large" variant="contained">
              TRY AGAIN
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
