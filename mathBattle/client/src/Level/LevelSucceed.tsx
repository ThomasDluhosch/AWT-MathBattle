import { Typography, Box, Button, Grid, ButtonGroup } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";

export function LevelSucceed() {
    const navigate = useNavigate();
    const levelId = useLevelId();
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get("score");
    const time = searchParams.get("time");
    const returnToMap = () => {
        navigate("/map");
    };
    const goNext = () => {
        navigate("/level/" + (levelId + 1))
    }

    return (
        <div>
            <NavBar />

            <Box textAlign="center" sx={{ m: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">Well done!</Typography>
                        <Typography variant="h6">
                            You solved this level in just {time} seconds!
                        </Typography>
                        <Typography variant="h6">
                            Your score is {score}
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
                                <Button variant="contained"  onClick={goNext}>Next Level</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
