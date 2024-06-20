import { Typography, Box, Button, Grid, ButtonGroup } from "@mui/material";
import { NavBar } from "../NavBar";

export function LevelSucceed() {
    return (
        <div>
            <NavBar />

            <Box textAlign="center" sx={{ m: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">Well done!</Typography>
                        <Typography variant="h6">
                            You solved this level in just x seconds!
                        </Typography>
                        <Typography variant="h6">
                            # equations were correct!
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="outlined">Main Menu</Button>
                        <Button variant="contained">Next Level</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
