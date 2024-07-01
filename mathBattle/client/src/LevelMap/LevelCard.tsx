import { Card, CardContent, Typography, CardActions, Box, Button, CardActionArea, Icon } from "@mui/material";
import { ILevel } from "../Interfaces/ILevel";

const medalStyle =  {backgroundColor:"white",border:0, borderRadius: 2, mr: 1, p:0.5};
export function LevelCard(props: ILevel) {
    return (

        <Card sx={{ minWidth: 100, backgroundColor: props.completed ? '#b5ccad' : props.locked ? "#d9d9d9" : '#a2a3dd' }} >
            <CardActionArea href={"/level/" + props.number}>
                <CardContent>
                    <Typography variant='h3'>
                        {props.locked ?
                            <Icon sx={{ color: "#a2a3dd" }} fontSize="large">lock</Icon>
                            : props.number}
                    </Typography>
                    {props.locked ? <Icon sx={{ p:0.5,color: "#d9d9d9" }} >workspace_premium</Icon> :
                        <div>
                        <Icon sx={{ ...medalStyle,color: props.medals.addition ? "darkred" : "#808080" }} >workspace_premium</Icon>
                        <Icon sx={{ ...medalStyle,color: props.medals.subtraction ? "darkblue" :"#808080" }} >workspace_premium</Icon>
                        <Icon sx={{  ...medalStyle,color: props.medals.multiplication ? "darkgreen" :"#808080" }} >workspace_premium</Icon>
                        <Icon sx={{  ...medalStyle,color: props.medals.division ? "purple" :"#808080" }} >workspace_premium</Icon>
                        </div>
                    }
            </CardContent>
        </CardActionArea>
            </Card >
    )
}