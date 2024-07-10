import { Request, Response } from "express";
import { UserModel } from "../database/users/UserModel";
import { IUser } from "../database/users/IUser";

interface UserOptions {
    gameMode: 'multiple choice' | 'type yourself';
    soundVolume: number,
    fontSize: number
}

export async function postUserOptions(req: Request, res: Response) {
    const username = req.params.id;
    if (!username) return res.status(403).send("No user set");
    const userOptions = req.body as UserOptions;    
    if (!userOptions) return res.status(401).send("Info missing");  // doesn't really check that the info is well
    
    const updateOptions = await updateUserOptions(userOptions, username);
    if (updateOptions.matchedCount == 1) {
        res.sendStatus(200);
    } else {
        return res.sendStatus(404).send("Specified user not found");
    }
}

async function updateUserOptions(optionsInfo: UserOptions, username: String) {
    const updateOptions = await UserModel.updateOne({ username: username }, { $set: { options: optionsInfo } });
    return updateOptions;
}


