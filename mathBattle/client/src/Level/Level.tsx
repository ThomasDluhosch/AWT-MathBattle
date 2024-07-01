import { Typography, Box, TextField, LinearProgress, Grid, Button } from "@mui/material";
import { NavBar } from "../NavBar";
import { theme } from "../main-theme"
import { useLevelBattleService } from "./useLevelBattleService";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAlertSnackbar } from "../useAlertSnackbar";

const taskStyle = { border: 5, borderRadius: 5, borderColor: theme.palette.secondary.main };
const barStyle = { height: "1em", width: "80%", ml: "10%" };

enum SolutionGiven {
    NO,
    CORRECT,
    INCORRECT
}

export function Level(props: { levelID: number }) {
    const timePerTask = 20;
    const getLevelBattle = useLevelBattleService();
    const [setAlert, AlertBar] = useAlertSnackbar();
    const [levelBattle, setLevelBattle] = useState<ILevelBattle>();
    const [playerHealth, setPlayerHealth] = useState<number>(3);
    const [solutionInput, setSolutionInput] = useState<number | undefined>(undefined);
    const [currentTask, setCurTask] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(timePerTask);
    const [monsterHealth, setMonsterHealth] = useState<number>(0);
    const [timeTotal, setTimeTotal] = useState<number>(0);
    const [solutionGiven, setSolutionGiven] = useState<SolutionGiven>(SolutionGiven.NO);

    useEffect(() => {
        getLevelBattle(props.levelID).then((result) => {
            if (result) {
                setLevelBattle(result);
                setMonsterHealth(result.monsterHealth);
            }
        });
    }, []);

    useEffect(() => {
        if (timeRemaining > 0 && solutionGiven == SolutionGiven.NO) {
            const timer = setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => { clearInterval(timer)};
        } else if (solutionGiven == SolutionGiven.NO){
            setAlert("Upps! Time has run out!", "error");
            setPlayerHealth(playerHealth - 1);
            setSolutionGiven(SolutionGiven.INCORRECT);
        }
        
    }, [timeRemaining]);

    const getHealthInPercent = () => {
        return monsterHealth && levelBattle?.monsterHealth ? (monsterHealth / levelBattle?.monsterHealth) * 100 : 0;
    }
    const getTimeInPercent = () => {
        return (timeRemaining / timePerTask) * 100;
    }

    const checkSolution = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newMonsterHealth = monsterHealth;
        let newPlayerHealth = playerHealth;
        if (levelBattle?.tasks[currentTask].solution == solutionInput) {
            setAlert("Correct! You did it!", "success");
            const timeUsed = timePerTask - timeRemaining;
            setTimeTotal(timeTotal + timeUsed);
            const timeUsedPercentage = timeUsed / timePerTask;
            if (timeUsedPercentage < 0.5) {
                newMonsterHealth = monsterHealth - 10;
            } else if (timeUsedPercentage > 0.8) {
                newMonsterHealth = monsterHealth - 9
            } else {
                newMonsterHealth = monsterHealth - 8;
            }
            setMonsterHealth(newMonsterHealth);
            setSolutionGiven(SolutionGiven.CORRECT);
        } else {
            setAlert("Upps! That's not correct!", "error");
            newPlayerHealth = playerHealth - 1;
            setPlayerHealth(newPlayerHealth);
            setSolutionGiven(SolutionGiven.INCORRECT);
        }
        if (newPlayerHealth == 0) {
            //TODO: game failed
        } else if (newMonsterHealth == 0) {
            //TODO: game succeded
        } 

    }

    const changeSolutionInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSolutionInput(parseInt(e.target.value));
    }

    function goToNextTask(): void {
        setSolutionGiven(SolutionGiven.NO);
        setCurTask(currentTask + 1);
        setTimeRemaining(timePerTask);
    }

    return (

        <div>
            <NavBar />
            <AlertBar />
            <Box textAlign='center' sx={{ m: 3, mt: 8 }}>
                <Grid container>
                    <Grid item xs={12}>
                        {
                            [1, 2, 3].map((v) => v <= playerHealth ?
                                <img src="/public/heart.svg" style={{ width: '5em' }} /> :
                                <img src="/public/heart-lost.svg" style={{ width: '5em' }} />)
                        }
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography sx={taskStyle} variant="h1">{
                            levelBattle?.tasks[currentTask].task
                        }
                            <span style={{ color: solutionGiven == SolutionGiven.CORRECT ? "green" : "red" }}>
                                {(solutionGiven == SolutionGiven.NO ? "" : " = " + levelBattle?.tasks[currentTask].solution)}
                            </span>
                        </Typography>
                        <br />
                        <form onSubmit={(e) => checkSolution(e)}>
                            <TextField
                                sx={taskStyle}
                                value={solutionInput ?? ""}
                                onChange={(e) => changeSolutionInput(e)}
                                type="number"
                                fullWidth
                                disabled={solutionGiven != SolutionGiven.NO}
                                placeholder="Solution"></TextField>
                        </form>
                        <br />
                        {
                            solutionGiven != SolutionGiven.NO ?
                                <Button onClick={() => goToNextTask()}>Next Task</Button>
                                : <></>
                        }
                        <br />
                        <LinearProgress color="secondary" variant="determinate" value={getTimeInPercent()} sx={{ ...barStyle, mt: 2 }} />
                        <br />
                        <Typography textAlign="center" variant="body1">{`${timeRemaining} seconds`}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <LinearProgress color="primary" variant="determinate" value={getHealthInPercent()} sx={barStyle} />
                        <br />
                        <Typography textAlign="center" variant="body1">{`${monsterHealth} / ${levelBattle?.monsterHealth}`}</Typography>
                        <br />
                        <img src={levelBattle?.monsterPicture} style={{ height: "16em" }} />
                    </Grid>
                </Grid>
            </Box>


        </div>
    );
}



