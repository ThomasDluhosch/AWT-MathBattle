import { Typography, Box, TextField, LinearProgress } from "@mui/material";
import { NavBar } from "../NavBar";
import {theme} from "../main-theme"
import { useLevelBattleService } from "./useLevelBattleService";
import { ILevelBattle } from "../Interfaces/ILevelBattle";
import { useEffect, useState } from "react";

export function Level(props: { levelID: number }) {

    const getLevelBattle = useLevelBattleService();
    const [levelBattle, setLevelBattle] = useState<ILevelBattle>();

    useEffect(() => {
        getLevelBattle(props.levelID).then((result) => {
          if (result) setLevelBattle(result);
        });
      }, []);

    const time = 80;
    const maxHealth = levelBattle?.monsterHealth;   // initial health
    const health = 10;
      
    return (

        <div>
            <NavBar />


            <Box sx={{display: 'flex', justifyContent:'center', pt: '2em'}}>
            <img src="/public/heart.svg" style={{ width: '5em'}}/>
            <img src="/public/heart.svg" style={{ width: '5em'}}/>
            <img src="/public/heart-lost.svg" style={{ width: '5em'}}/>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>

                <Box sx={{height: '22em', width: '40em', m: '1em', p:'1em', display: 'flex', justifyContent:'space-between', flexDirection:'column'}}>

                    <Box sx={{border: 5, borderRadius: 5, borderColor: theme.palette.secondary.main, display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h1">99 + 1</Typography>
                    </Box>
                  
                    <Box sx={{border: 5, height:'5em', borderRadius: 5, borderColor: theme.palette.secondary.main, display: 'flex', justifyContent: 'center', mt: '2em'}}>
                        <TextField fullWidth placeholder="Solution"></TextField>
                    </Box>

                    <Box sx={{mt: '2em', display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <LinearProgress color="secondary" variant="determinate" value={time} sx={{height:"2em", width:"80%"}} />
                        <Typography textAlign="center" variant="body1">{`${time} seconds`}</Typography>
                    </Box>

                </Box>



                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height:'22em', width: '40em', m: '1em', p:'1em'}}>
                    <Box sx={{height: "16em", border: 5, borderRadius:5, borderColor: theme.palette.primary.main, width: "100%", display: "flex", justifyContent: "center"}}>
                        <img src={levelBattle?.monsterPicture} style={{}}/>
                    </Box>

                    <Box sx={{mt: '2em', width:"80%"}}>
                        <LinearProgress color="primary" variant="determinate" value={health} sx={{height:"2em", width:"100%"}} />
                        <Typography textAlign="center" variant="body1">{`${health} / ${maxHealth}`}</Typography>
                    </Box>

                </Box>
            </Box>



        </div>
    );
}
