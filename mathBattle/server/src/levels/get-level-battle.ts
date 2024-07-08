import { Request, Response } from "express";
import { LevelModel } from "../database/levels/LevelModel";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { CalculationsModel } from "../database/calculations/CalculationsModel";
import { ILevel } from "../database/levels/ILevel";
import { CalcType, ICalculation } from "../database/calculations/ICalculations";

var sample = require('@stdlib/random-sample');
export async function getLevelBattle(req: Request, res: Response) {
    const numberLevel = req.params.id;
    if (!numberLevel) return res.status(403).send("No level number");

    const level = await LevelModel.findOne({ number: numberLevel });
    if (!level) return res.status(404).send("Level not found");

    const user = req.user;
    if(!user) return res.status(403).send("No user set");
    const levelStats = await LevelStatisticsModel.findOne({ number: numberLevel, username: user.username });

    const calcTypeParam = req.query.calcType as string;
    let calcType = parseInt(calcTypeParam);
    if (isNaN(calcType)) calcType = 0;
    const tasks = await getTasks(level, calcType);
    res.status(200).send({
        monsterPicture: level.monsterPicture,
        monsterHealth: level.monsterHealth,
        tasks: tasks,
        highscore: levelStats?.score ?? 0
    });
}

async function getTasks(level: ILevel, calcType: number) {
    const calcFilter = {
        type: calcType,
        difficulty: level.calcDifficulty
    }

    // one calculation should remove 8-10 health points and the hero can miss twice
    const numberOfNeededTasks = Math.floor((level.monsterHealth / 8) + 2);

    const allTasks = await CalculationsModel.aggregate<ICalculation>([
        { $match: calcFilter },
        { $project: { task: 1, solution: 1, _id: 0 } }
    ]);
    if (allTasks.length < numberOfNeededTasks){
        return [];
    }
    // we cant do sample on the aggregate because of a bug in Azure Cosmos DB :(
    const randomTasks = sample(allTasks, {
        'size': numberOfNeededTasks,
        'replace': false
    });

    return randomTasks;
}