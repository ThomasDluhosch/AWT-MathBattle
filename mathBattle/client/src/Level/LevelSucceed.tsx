import { Typography, Box, Button, Grid, ButtonGroup, Icon, useTheme } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";
import { useState, useEffect } from "react";
import { useLevelHighscoresService } from "./useLevelHighscoresService";

export function LevelSucceed() {
    const navigate = useNavigate();
    const levelId = useLevelId();
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get("score");
    const time = searchParams.get("time");
    const theme = useTheme();
    const [levelHighscores, setLevelHighscores] = useState<[{ username: String, score: Number }]>();
    const getLevelHighscores = useLevelHighscoresService();

    useEffect(() => {
        getLevelHighscores(levelId).then((result) => {
            if (result) setLevelHighscores(result);
        });
    }, []);

    const returnToMap = () => {
        navigate("/");
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
                        <Typography variant="h1">Well done!</Typography>
                        <Typography variant="h6">
                            You solved this level in just  <span style={{color: theme.palette.primary.dark}}><b>{time}</b></span> seconds!
                        </Typography>
                        <Typography variant="h6">
                            Your score is <span style={{color: theme.palette.primary.dark}}><b>{score}</b></span>
                        </Typography>
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
                    <Grid item xs={12} sx={{ border: 4, borderColor: theme.palette.primary.light, borderRadius: 5, m: 2, p: 2, ml: "20%", mr: "20%", backgroundColor: "rgba(241, 211, 171, 0.7)" }}>
                        <Typography variant="h4">Highscores</Typography>
                        {levelHighscores?.map((e, index) => (
                            <Typography variant="h6">{index + 1}. {e.username}: {e.score.toString()}</Typography>
                        ))}
                    </Grid>


                </Grid>
            </Box>
        </div>
    );
}
