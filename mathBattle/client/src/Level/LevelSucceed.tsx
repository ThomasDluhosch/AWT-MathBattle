import { Typography, Box, Button, Grid, ButtonGroup, Icon, useTheme, ToggleButtonGroup, ToggleButton, Container } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";
import { useState, useEffect } from "react";
import { useLevelHighscoresService } from "./useLevelHighscoresService";
import { CalcType } from "../Interfaces/CalcType";
import { characters } from "../Interfaces/Characters";

export function LevelSucceed() {
    const navigate = useNavigate();
    const levelId = useLevelId();
    const [searchParams, setSearchParams] = useSearchParams();
    const score = searchParams.get("score");
    const time = searchParams.get("time");
    const type = searchParams.get("type");
    const calcType: CalcType = type ? parseInt(type) : 0;
    const theme = useTheme();
    const [levelHighscores, setLevelHighscores] = useState<[{ username: String, score: Number }]>();
    const [curCalcType, setCalcType] = useState(calcType);
    const getLevelHighscores = useLevelHighscoresService();

    useEffect(() => {
        getLevelHighscores(levelId).then((result) => {
            if (result) setLevelHighscores(result);
        });
    }, []);

    function handleCalcTypeChange(event: any, value: any): void {
        setCalcType(value);
    }

    const returnToMap = () => {
        navigate("/");
    };
    const goNext = () => {
        navigate("/level/" + (levelId + 1) + "?type=" + curCalcType)
    }
    const retry = () => {
        navigate("/level/" + levelId + "?type=" + curCalcType)
    };

    return (
        <div>
            <NavBar />

            <Container sx={{textAlign:"center", mt: 10}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">Well done!</Typography>
                        <Typography variant="h6">
                            You solved this level in just  <span style={{ color: theme.palette.primary.dark }}><b>{time}</b></span> seconds!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            value={curCalcType}
                            exclusive
                            color="primary"
                            onChange={handleCalcTypeChange}
                            aria-label="Your hero"
                        >
                            {
                                [CalcType.ADD, CalcType.SUBTRACT, CalcType.MULTIPLICATE, CalcType.DIVIDE].map((calc: CalcType) =>
                                    <ToggleButton value={calc} key={calc}
                                        style={{ maxWidth: "18vw" }}>
                                        <img src={characters.get(calc)} style={{ maxHeight: "10vh" }}></img>
                                    </ToggleButton>
                                )
                            }
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Your score is <span style={{ color: theme.palette.primary.dark }}><b>{score}</b></span>
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
            </Container>
        </div>
    );
}
