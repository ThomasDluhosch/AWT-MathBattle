import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { LevelModel } from "../database/levels/LevelModel";

export async function initLevelStatistics(username: string) {
  const numberOfLevels = await LevelModel.countDocuments();
  for (let index = 1; index <= numberOfLevels; index++) {
    await LevelStatisticsModel.create({
      number: index,
      username: username,
      completed: false,
      locked: index != 1,
      medals: {
        addition: false,
        subtraction: false,
        multiplication: false,
        division: false,
      }
    });
  }
}
