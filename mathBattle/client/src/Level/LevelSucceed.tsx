import { Typography, Box, Button, Grid, ButtonGroup } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";

export function LevelSucceed() {
    const navigate = useNavigate();
    const returnToMap = () => {
        navigate("/map");
    };

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
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={returnToMap}
                                >
                                    Main Menu
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained">Next Level</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
