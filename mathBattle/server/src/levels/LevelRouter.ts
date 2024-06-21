import { Router } from "express";
import { Request, Response } from "express";
import { tryProcess } from "../helper/tryProcess";
import { getLevelMap } from "./get-level-map";


export const LevelRouter = Router();

LevelRouter.post("/", (req: Request, res: Response) => tryProcess(req, res, getLevelMap));