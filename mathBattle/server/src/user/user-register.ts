import { Response, Request } from "express";
import { UserModel } from "../database/users/UserModel";
import { hashPassword } from "./hashing";
import { GameMode, IOptions, IUser } from "../database/users/IUser";
import { initLevelStatistics } from "./initLevelStatistics";


export async function registerUser(req: Request, res: Response) {
  const user = req.body;

  const { username, password }: IUser = user;

  if (username == "") {
    res.status(412).json({
      message: "No username given",
    });
    return;
  }

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
  const defaultOptions: IOptions = {
    gameMode: GameMode.TYPING,
    soundVolume: 50,
    fontSize: 16
  }
  await UserModel.create({
    username,
    password: hashedPwd,
    options: defaultOptions
  });

  await initLevelStatistics(username);

  res.status(200).json({
    success: true,
    message: " User created Successfully",
  });
}

