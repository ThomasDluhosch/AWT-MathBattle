import { Typography, Box, TextField, LinearProgress, Grid } from "@mui/material";
import { NavBar } from "../NavBar";
import { theme } from "../main-theme"
import { useLevelBattleService } from "./useLevelBattleService";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { useEffect, useState } from "react";

const taskStyle = { border: 5, borderRadius: 5, borderColor: theme.palette.secondary.main };
const barStyle = { height: "2em", width: "80%", ml: "10%" };
export function Level(props: { levelID: number }) {

    const getLevelBattle = useLevelBattleService();
    const [levelBattle, setLevelBattle] = useState<ILevelBattle>();
    const [playerHealth, setPlayerHealth] = useState<number>(3);

    useEffect(() => {
        getLevelBattle(props.levelID).then((result) => {
            if (result) setLevelBattle(result);
        });
    }, []);

    const time = 80;
    const maxHealth = levelBattle?.monsterHealth;   // initial health
    const health = levelBattle?.monsterHealth;
    const getHealthInPercent = () => {
        return health && maxHealth ? (maxHealth / health) * 100 : 0;
    }

    return (

        <div>
            <NavBar />
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
                        <Typography sx={taskStyle} variant="h1">99 + 1</Typography>
                        <br />
                        <TextField
                            sx={taskStyle} fullWidth placeholder="Solution"></TextField>
                        <br />
                        <LinearProgress color="secondary" variant="determinate" value={time} sx={{ ...barStyle, mt: 2 }} />
                        <br />
                        <Typography textAlign="center" variant="body1">{`${time} seconds`}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <LinearProgress color="primary" variant="determinate" value={getHealthInPercent()} sx={barStyle} />
                        <br />
                        <Typography textAlign="center" variant="body1">{`${health} / ${maxHealth}`}</Typography>
                        <br />
                        <img src={levelBattle?.monsterPicture} style={{ height: "16em" }} />
                    </Grid>
                </Grid>
            </Box>


        </div>
    );
}
