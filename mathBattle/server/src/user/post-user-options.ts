import { Request, Response } from "express";
import { UserModel } from "../database/users/UserModel";
import { IOptions, IUser } from "../database/users/IUser";


export async function postUserOptions(req: Request, res: Response) {
    const user = req.user;
    if(!user) return res.status(403).send("No user set");
    const userOptions = req.body as IOptions;    
    if (!userOptions) return res.status(401).send("Info missing");  // doesn't really check that the info is well
    
    const updateOptions = await updateUserOptions(userOptions, user.username);
    if (updateOptions.matchedCount == 1) {
        res.sendStatus(200);
    } else {
        return res.sendStatus(404).send("Specified user not found");
    }
}

async function updateUserOptions(optionsInfo: IOptions, username: String) {
    const updateOptions = await UserModel.updateOne({ username: username }, { $set: { options: optionsInfo } });
    return updateOptions;
}


