import { Request, Response } from "express";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { crossOriginResourcePolicy } from "helmet";

export async function getLevelHighscores(req: Request, res: Response) {
    const numberLevel = req.params.id;
    if (!numberLevel) return res.status(403).send("No level number");

    const levelHighscores = await LevelStatisticsModel.find({ number: numberLevel }).sort({ score: -1 }).limit(3)
                                                      .select({ _id: 0, username: 1, score: 1 }).exec();

    res.status(200).send(levelHighscores);
}

