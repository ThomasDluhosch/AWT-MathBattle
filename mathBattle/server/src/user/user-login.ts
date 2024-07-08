import { Request, Response } from "express";
import { UserModel } from "../database/users/UserModel";
import jwt from 'jsonwebtoken';
import { hashPassword } from "./hashing";
import { IUser } from "../database/users/IUser";


export async function  loginUser(req: Request, res: Response) {
    const user : IUser = req.body;
    const { username, password } = user;
    console.log(username);

    const userFromDb = await UserModel.findOne({
        username: username,
    });
    if (!userFromDb) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const passwordIsCorrect =
       hashPassword(password) ===  userFromDb?.password;

    if (!passwordIsCorrect) {
        return res.status(400).json({
            success: false,
            message: "wrong password",
        });
    }
    const token = jwt.sign(
        { _id: userFromDb?._id, username: userFromDb?.username },
        process.env.SECRET || "SECRET",
        {
            expiresIn: "1d",
        }
    );

    // send the response
    res.status(200).json({
        success: true,
        message: "login success",
        token: token,
    });
}

