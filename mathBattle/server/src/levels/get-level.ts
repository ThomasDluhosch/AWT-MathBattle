import { Request, Response } from "express";
import { LevelModel } from "../database/levels/LevelModel";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";


export async function getLevel(req: Request, res: Response){
    const numberLevel = req.params.id;
    if(!numberLevel) return res.status(403).send("No level number");
    const level = await LevelStatisticsModel.find({number: numberLevel});
    res.status(200).send(level);
}