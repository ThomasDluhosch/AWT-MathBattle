import { Typography, Box, Button, Grid, ButtonGroup } from "@mui/material";
import { NavBar } from "../NavBar";
import { useNavigate } from "react-router-dom";
import {theme} from "../main-theme"

export function Level() {
    /*
    const navigate = useNavigate();
    const returnToMap = () => {
        navigate("/map");
    };
    */

    return (

        <div>
            <NavBar />


            <Box sx={{display: 'flex', justifyContent:'center', pt: '2em'}}>
            <img src="/public/heart.svg" style={{ width: '5em'}}/>
            <img src="/public/heart.svg" style={{ width: '5em'}}/>
            <img src="/public/heart-lost.svg" style={{ width: '5em'}}/>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', border: 1, flexWrap: 'wrap'}}>
                <Box sx={{border: 1, borderColor: theme.palette.primary.main, width: '40em', m: '1em', p:'1em'}}>
                    1 + 1

                    <Box>
                    Solution
                    </Box>

                    <Box>
                    Timer
                    </Box>

                </Box>
                <Box sx={{display: 'flex', alignContent: 'center',justifyContent:'center', flexDirection: 'column',border: 1, borderColor: theme.palette.secondary.main, width: '40em', m: '1em', p:'1em'}}>
                    <img src="/public/monsters/FlyingEye.svg" style={{ width: '25em'}}/>

                    <Box>
                        Healthbar
                    </Box>

                </Box>
            </Box>



        </div>
    );
}
