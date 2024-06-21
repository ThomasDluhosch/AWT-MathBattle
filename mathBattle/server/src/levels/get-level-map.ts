import { Request, Response } from "express";
import { LevelModel } from "../database/levels/LevelModel";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";


export async function getLevelMap(req: Request, res: Response){
    const user = req.user;
    if(!user) return res.status(403).send("No user set");

    const userLevels = LevelStatisticsModel.find({username: user.username}).projection({_id:0, number: 1, completed: 1});
    res.status(200).send(userLevels);
}