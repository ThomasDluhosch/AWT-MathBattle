import { Request, Response } from "express";
import { UserModel } from "../database/users/UserModel";

export async function getUserOptions(req: Request, res: Response){
    const username = req.params.id;
    if(!username) return res.status(403).send("No user set");
    const userOptions = await UserModel.find({username: username}).select({_id: 0, options: 1}).exec();
    if (!userOptions || userOptions.length == 0) {  // without the second condition, if the user doesn't exist returns [], but no error
        res.status(404).send("User not found");
        return;
    }
    res.status(200).send(userOptions);
}