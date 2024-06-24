import { Response, Request } from "express";
import { UserModel } from "../database/users/UserModel";
import { hashPassword } from "./hashing";
import { IUser } from "../database/users/IUser";
import { LevelStatisticsModel } from "../database/level-statistics/LevelStatisticsModel";
import { LevelModel } from "../database/levels/LevelModel";


export async function registerUser(req: Request, res: Response) {
  const user = req.body;

  const { username, password }: IUser = user;

  const userFromDb = await UserModel.findOne({
    username: username,
  });

  if (userFromDb) {
    res.status(400).json({
      message: "Username already in use",
    });
    return;
  }

  const hashedPwd = hashPassword(password);
  await UserModel.create({
    username,
    password: hashedPwd
  });

  await initLevelStatistics(username);

  res.status(200).json({
    success: true,
    message: " User created Successfully",
  });
}

async function initLevelStatistics(username: string) {
  const numberOfLevels = await LevelModel.countDocuments();
  for (let index = 1; index <= numberOfLevels; index++) {
    await LevelStatisticsModel.create({
      number: index,
      username: username,
      completed: false,
      medals: {
        addition: false,
        subtraction: false,
        multiplication: false,
        division: false,
      }
    });
  }
}
