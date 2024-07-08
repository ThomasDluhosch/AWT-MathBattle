import { Typography, Box, Button, Grid, ButtonGroup, Icon } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";
import { useLevelHighscoresService } from "./useLevelHighscoresService";
import { useEffect, useState } from "react";

export function LevelHighscores() {
    const navigate = useNavigate();
    const levelId = useLevelId();
    const [levelHighscores, setLevelHighscores] = useState<[{username: String, score: Number}]>();
    const getLevelHighscores = useLevelHighscoresService();

    useEffect(() => {
        getLevelHighscores(levelId).then((result) => {
            if(result) setLevelHighscores(result);
        });
    }, []);

    const returnToMap = () => {
        navigate("/map");
    };
    const goNext = () => {
        navigate("/level/" + (levelId + 1))
    }
    const retry = () => {
        navigate("/level/" + levelId)
    };

    return (
        <div>
            <NavBar />

            <Box textAlign="center" sx={{ m: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Highscores</Typography>
                            {levelHighscores?.map((e) => (
                                <h5>{e.username}: {e.score.toString()}</h5>
                                )
                            )}

                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={returnToMap}
                                    startIcon={<Icon>home</Icon>}
                                >
                                    Main Menu
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" 
                                startIcon={<Icon>skip_next</Icon>}
                                onClick={goNext}>Next Level</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="text"
                                    startIcon={<Icon>repeat</Icon>}
                                    onClick={retry}>
                                    TRY AGAIN
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
