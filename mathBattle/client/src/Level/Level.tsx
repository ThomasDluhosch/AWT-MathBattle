import {
  Typography,
  Box,
  TextField,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";
import { NavBar } from "../NavBar";
import { theme } from "../main-theme";
import { useLevelBattleService } from "./useLevelBattleService";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAlertSnackbar } from "../useAlertSnackbar";
import { fetchFromBackendAuth } from "../fetch/fetch-backend";
import { useNavigate, useParams } from "react-router-dom";
import { useLevelId } from "./useLevelId";
import useKeypress from "react-use-keypress";
import { characters } from "../Interfaces/Characters";
import BackgroundSound from "../BackgroundSound";

const taskStyle = {
  border: 5,
  borderRadius: 5,
  borderColor: theme.palette.secondary.main,
};
const barStyle = { height: "1em", width: "80%", ml: "10%" };
import { Howl } from "howler";
import hurt from "../sounds/hurt.mp3";
import slash from "../sounds/slash.mp3";

const sound1Howl = new Howl({ src: [hurt] });
const sound2Howl = new Howl({ src: [slash] });

const IncorrectAnswer = () => {
  sound1Howl.play();
};

const CorrectAnswer = () => {
  sound2Howl.play();
};

enum SolutionGiven {
  NO,
  CORRECT,
  INCORRECT,
}

export function Level() {
  const timePerTask = 20;
  const navigate = useNavigate();
  const levelId = useLevelId();
  const [getLevelBattle, battleSuccess, calcType] = useLevelBattleService();
  const [setAlert, AlertBar, closeAlert] = useAlertSnackbar();
  const [levelBattle, setLevelBattle] = useState<ILevelBattle>();
  const [playerHealth, setPlayerHealth] = useState<number>(3);
  const [solutionInput, setSolutionInput] = useState<number | undefined>(
    undefined
  );
  const [currentTask, setCurTask] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(timePerTask);
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [timeTotal, setTimeTotal] = useState<number>(0);
  const [solutionGiven, setSolutionGiven] = useState<SolutionGiven>(
    SolutionGiven.NO
  );

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

  const checkSolution = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (solutionInput == undefined) return;
    let newMonsterHealth = monsterHealth;
    let newPlayerHealth = playerHealth;
    if (levelBattle?.tasks[currentTask].solution == solutionInput) {
      setSolutionGiven(SolutionGiven.CORRECT);
      const timeUsed = timePerTask - timeRemaining;
      const newTimeTotal = timeTotal + timeUsed;
      setTimeTotal(newTimeTotal);
      const timeUsedPercentage = timeUsed / timePerTask;
      if (timeUsedPercentage < 0.5) {
        newMonsterHealth = monsterHealth - 10;
      } else if (timeUsedPercentage > 0.8) {
        newMonsterHealth = monsterHealth - 9;
      } else {
        newMonsterHealth = monsterHealth - 8;
      }
      setMonsterHealth(newMonsterHealth);
      CorrectAnswer();
      setAlert("Correct! You did it!", "success");
      if (newMonsterHealth <= 0) {
        const maxTime = (monsterHealth / 8 + 3) * timePerTask;
        const score = maxTime - newTimeTotal + playerHealth * 10;
        battleSuccess(levelId, score).then((success) => {
          if (!success) {
            setAlert("Sorry something went wrong.", "error");
          } else {
            navigate(
              `/${levelId}/succeed?score=${score}&time=${newTimeTotal}&type=${calcType}`
            );
          }
        });
      }
    } else {
      setSolutionGiven(SolutionGiven.INCORRECT);
      newPlayerHealth = playerHealth - 1;
      setPlayerHealth(newPlayerHealth);
      IncorrectAnswer();
      setAlert("Upps! That's not correct!", "error");
      if (newPlayerHealth <= 0) {
        navigate(`/${levelId}/failed`);
      }
    }
  };

  const changeSolutionInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSolutionInput(parseInt(e.target.value));
  };

  function goToNextTask(): void {
    closeAlert();
    setSolutionGiven(SolutionGiven.NO);
    setCurTask(currentTask + 1);
    setTimeRemaining(timePerTask);
    setSolutionInput(undefined);
  }

  return (
    <div>
      <BackgroundSound />
      <NavBar />
      <AlertBar />
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
            <Typography sx={taskStyle} variant="h1">
              {levelBattle?.tasks[currentTask].task}
              <span
                style={{
                  color:
                    solutionGiven == SolutionGiven.CORRECT ? "green" : "red",
                }}
              >
                {solutionGiven == SolutionGiven.NO
                  ? ""
                  : " = " + levelBattle?.tasks[currentTask].solution}
              </span>
            </Typography>
            <br />
            <form onSubmit={(e) => checkSolution(e)}>
              <TextField
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
              ></TextField>
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
