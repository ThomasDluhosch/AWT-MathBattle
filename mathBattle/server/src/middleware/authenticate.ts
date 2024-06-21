import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET || "SECRET", (err: any, user: any) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user;
        next()
    });
}