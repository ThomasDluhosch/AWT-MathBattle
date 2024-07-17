import {
  Typography,
  Box,
  TextField,
  LinearProgress,
  Grid,
  Button,
  CircularProgress,
  Card,
  CardActionArea,
  Backdrop,
} from "@mui/material";
import { NavBar } from "../NavBar";
import { theme } from "../main-theme";
import { useLevelBattleService } from "./useLevelBattleService";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAlertSnackbar } from "../useAlertSnackbar";
import { useLevelId } from "./useLevelId";
import useKeypress from "react-use-keypress";
import { characters } from "../Interfaces/Characters";
import {useBackgroundSound} from "../Sounds/useBackgroundSound";
import { hurtSound, slashSound } from "../Sounds/LevelSounds";
import { GameMode } from "../Interfaces/IOptions";
import { useNavigate } from "react-router-dom";

const taskStyle = {
  border: 5,
  borderRadius: 5,
  borderColor: theme.palette.secondary.main,
};
const barStyle = { height: "1em", width: "80%", ml: "10%" };

enum SolutionGiven {
  NO,
  CORRECT,
  INCORRECT,
}
const timePerTask = 20;

export function Level() {
  const navigate = useNavigate();
  const levelId = useLevelId();
  const [getLevelBattle, battleSuccess, calcType] = useLevelBattleService();
  const [setAlert, AlertBar, closeAlert] = useAlertSnackbar();
  const [levelBattle, setLevelBattle] = useState<ILevelBattle>();
  const [solutionOptions, setSolutionOptions] = useState<number[]>([]);
  const [playerHealth, setPlayerHealth] = useState<number>(3);
  const [solutionInput, setSolutionInput] = useState<number | undefined>(
    undefined
  );
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [currentTask, setCurTask] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(timePerTask);
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [timeTotal, setTimeTotal] = useState<number>(0);
  const [solutionGiven, setSolutionGiven] = useState<SolutionGiven>(
    SolutionGiven.NO
  );
  useBackgroundSound();

  useKeypress("Enter", () => {
    if (solutionGiven != SolutionGiven.NO) goToNextTask();
  });

  useEffect(() => {
    getLevelBattle(levelId).then((result) => {
      if (result) {
        setLevelBattle(result);
        setMonsterHealth(result.monsterHealth);
      }
    });
  }, []);

  useEffect(() => {
    if (levelBattle?.tasks[currentTask] && levelBattle?.gameMode == GameMode.MULTIPLE_CHOICE) {
      const solutions = getRandomSolutions(levelBattle?.tasks[currentTask].solution, 3);
      setSolutionOptions(solutions.sort((a, b) => a - b));
    }
  }, [currentTask, levelBattle]);

  useEffect(() => {
    if (!levelBattle) return;
    if (timeRemaining > 0 && solutionGiven == SolutionGiven.NO) {
      const timer = setInterval(
        () => setTimeRemaining(timeRemaining - 1),
        1000
      );
      return () => {
        clearInterval(timer);
      };
    } else if (solutionGiven == SolutionGiven.NO) {
      setAlert("Upps! Time has run out!", "error");
      setPlayerHealth(playerHealth - 1);
      setSolutionGiven(SolutionGiven.INCORRECT);
    }
  }, [timeRemaining, solutionGiven, levelBattle]);

  const getHealthInPercent = () => {
    return monsterHealth && levelBattle?.monsterHealth
      ? (monsterHealth / levelBattle?.monsterHealth) * 100
      : 0;
  };
  const getTimeInPercent = () => {
    return (timeRemaining / timePerTask) * 100;
  };

  const submitSolution = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (solutionInput == undefined) return;
    checkSolution(solutionInput);
  };

  const checkSolution = (input: number) => {
    if (levelBattle?.tasks[currentTask].solution == input) {
      setSolutionGiven(SolutionGiven.CORRECT);
      const [timeUsedPercentage, newTimeTotal] = calculateTimes(timeRemaining, timeTotal);
      setTimeTotal(newTimeTotal);
      const newMonsterHealth = calculateNewMonsterHealth(timeUsedPercentage, monsterHealth);
      setMonsterHealth(newMonsterHealth);
      slashSound.play();
      setAlert("Correct! You did it!", "success");
      if (newMonsterHealth <= 0) {
        processLevelSuccess(newTimeTotal);
      }
    } else {
      setSolutionGiven(SolutionGiven.INCORRECT);
      const newPlayerHealth = playerHealth - 1;
      setPlayerHealth(newPlayerHealth);
      const [_, newTimeTotal] = calculateTimes(timeRemaining, timeTotal);
      setTimeTotal(newTimeTotal);
      hurtSound.play();
      setAlert("Upps! That's not correct!", "error");
      if (newPlayerHealth <= 0) {
        processLevelFail();
      }
    }
  }

  const changeSolutionInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSolutionInput(parseInt(e.target.value));
  };

  function processLevelFail() {
    navigate(`/${levelId}/failed?type=${calcType}`);
  }

  function processLevelSuccess(newTimeTotal: number) {
    const score = calculateScore(monsterHealth, newTimeTotal, playerHealth);
    setShowBackdrop(true);
    battleSuccess(levelId, score).then((success) => {
      setShowBackdrop(false);
      if (!success) {
        setAlert("Sorry something went wrong.", "error");
      } else {
        navigate(
          `/${levelId}/succeed?score=${score}&time=${newTimeTotal}&type=${calcType}`
        );
      }
    });
  }

  function goToNextTask(): void {
    closeAlert();
    setSolutionGiven(SolutionGiven.NO);
    setCurTask(currentTask + 1);
    setTimeRemaining(timePerTask);
    setSolutionInput(undefined);
  }

  if (!levelBattle) {
    return (
      <>
        <NavBar />
        <Box textAlign="center" sx={{ m: 3, mt: 8 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <div>
      <NavBar />
      <AlertBar />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <Typography variant="h2" sx={{ color: "#24b68b" }}>
          Success
        </Typography>
      </Backdrop>
      <Box textAlign="center" sx={{ m: 3, mt: 8 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">
              Highscore: {levelBattle?.highscore}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {[1, 2, 3].map((v) =>
              v <= playerHealth ? (
                <img src="/public/heart.svg" style={{ width: "5em" }} />
              ) : (
                <img src="/public/heart-lost.svg" style={{ width: "5em" }} />
              )
            )}
          </Grid>



          <Grid item xs={12} lg={6}>
            <Box sx={{ width: "80%", ml: "10%" }}>
              <Typography sx={taskStyle} variant="h2">
                {levelBattle?.tasks[currentTask].task}
                <span
                  style={{
                    color:
                      solutionGiven == SolutionGiven.CORRECT ? "#24b68b" : "#b6244f",
                  }}
                >
                  {solutionGiven == SolutionGiven.NO
                    ? ""
                    : " = " + levelBattle?.tasks[currentTask].solution}
                </span>
              </Typography>
              <br />
              <form onSubmit={(e) => submitSolution(e)}>
                {levelBattle?.gameMode == GameMode.TYPING ? <TextField
                  id="solution"
                  autoFocus
                  inputRef={(input) =>
                    input && solutionGiven == SolutionGiven.NO && input.focus()
                  }
                  sx={taskStyle}
                  value={solutionInput ?? ""}
                  onChange={(e) => changeSolutionInput(e)}
                  type="number"
                  fullWidth
                  disabled={solutionGiven != SolutionGiven.NO}
                  placeholder="Solution"
                ></TextField> : <Box>
                  {
                    solutionOptions.map((possibleSolution) => <Card sx={{ ...taskStyle, mb: 1, backgroundColor: "transparent" }}>
                      <CardActionArea disabled={solutionGiven != SolutionGiven.NO} sx={{ padding: 1 }} onClick={() => checkSolution(possibleSolution)}>
                        <Typography variant="h4">
                          {possibleSolution}</Typography>
                      </CardActionArea>
                    </Card>)
                  }

                </Box>}
                <br />
                {solutionGiven != SolutionGiven.NO ? (
                  <>
                    <Typography variant="body2">
                      Press Enter to proceed
                    </Typography>
                    <Button onClick={() => goToNextTask()}>Next Task </Button>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </Box>



            <br />
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={getTimeInPercent()}
              sx={{ ...barStyle, mt: 2 }}
            />


            <br />
            <Typography
              textAlign="center"
              variant="body1"
              sx={{ mb: 4 }}
            >{`${timeRemaining} seconds`}</Typography>
          </Grid>

          <Grid item xs={12} lg={6}>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={getHealthInPercent()}
              sx={barStyle}
            />
            <br />
            <Typography
              textAlign="center"
              variant="body1"
            >{`${monsterHealth} / ${levelBattle?.monsterHealth}`}</Typography>
            <br />
            <img
              src={characters.get(calcType)}
              style={{ maxHeight: "16em", marginRight: 20 }}
            ></img>
            <img
              src={levelBattle?.monsterPicture}
              style={{ height: "16em", marginLeft: 20 }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}



function calculateNewMonsterHealth(timeUsedPercentage: number, monsterHealth: number) {
  if (timeUsedPercentage < 0.5) {
    return monsterHealth - 10;
  } else if (timeUsedPercentage > 0.8) {
    return monsterHealth - 9;
  } else {
    return monsterHealth - 8;
  }
}

function calculateScore(monsterHealth: number, newTimeTotal: number, playerHealth: number) {
  const maxTime = (monsterHealth / 8 + 3) * timePerTask;
  const score = maxTime - newTimeTotal + playerHealth * 10;
  return score;
}

function getRandomSolutions(solution: number, numberOfSolutions: number) {
  const solutions = [solution];
  while (solutions.length < numberOfSolutions) {
    var candidateInt = Math.floor(Math.random() * 8) + 1
    if (candidateInt != 4 && solutions.indexOf(candidateInt) === -1) {
      const newSolution = solution + candidateInt - 4
      solutions.push(newSolution)
    }
  }
  return solutions;
}

function calculateTimes(timeRemaining: number, curTimeTotal: number) {
  const timeUsed = timePerTask - timeRemaining;
  const newTimeTotal = curTimeTotal + timeUsed;
  const timeUsedPercentage = timeUsed / timePerTask;
  return [timeUsedPercentage, newTimeTotal]
}
