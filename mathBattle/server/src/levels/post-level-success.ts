import { Request, Response } from "express";
import { LevelModel } from "../database/levels/LevelModel";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { CalcType } from "../database/calculations/ICalculations";


interface LevelSuccessInfo {
    levelNumber: number,
    score: number,
    calcType: CalcType
}

const calcTypeToMedalField = {
    [CalcType.ADD]: 'medals.addition',
    [CalcType.SUBTRACT]: 'medals.subtraction',
    [CalcType.MULTIPLICATE]: 'medals.multiplication',
    [CalcType.DIVIDE]: 'medals.division'
};

export async function postLevelSuccess(req: Request, res: Response){
    const user = req.user;
    if(!user) return res.status(403).send("No user set");
    const successInfo = req.body as LevelSuccessInfo;
    if(!successInfo || !successInfo.score) return res.status(401).send("Info missing");

    const medalField = calcTypeToMedalField[successInfo.calcType];
    const updateResult =  await LevelStatisticsModel.updateOne({number: successInfo.levelNumber, username: user.username},{
        $max: { score: successInfo.score },
        $set: { [medalField]: true }
    });
    if (updateResult.matchedCount == 1){
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}