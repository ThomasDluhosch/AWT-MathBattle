import { Request, Response } from "express";
import { LevelModel } from "../database/levels/LevelModel";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { CalcType } from "../database/calculations/ICalculations";
import { IUser } from "../database/users/IUser";


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

export async function postLevelSuccess(req: Request, res: Response) {
    const user = req.user;
    if (!user) return res.status(403).send("No user set");
    const successInfo = req.body as LevelSuccessInfo;
    if (!successInfo || !successInfo.score) return res.status(401).send("Info missing");

    const updateResult = await updateLevelScore(successInfo, user);
    if (updateResult.matchedCount == 1) {
        await unlockNextLevel(successInfo.levelNumber, user);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}

async function updateLevelScore(successInfo: LevelSuccessInfo, user: IUser) {
    const medalField = calcTypeToMedalField[successInfo.calcType];
    const updateResult = await LevelStatisticsModel.updateOne({ number: successInfo.levelNumber, username: user.username }, {
        $max: { score: successInfo.score },
        $set: { [medalField]: true, completed:true }
    });
    return updateResult;
}
function unlockNextLevel(levelNumber: number, user: IUser) {
    return LevelStatisticsModel.updateOne({ number: (levelNumber + 1), username: user.username }, {
        $set: { locked: false }
    });
}

