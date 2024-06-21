import { Router } from "express";
import { Request, Response } from "express";
import { tryProcess } from "../helper/tryProcess";
import { getLevelMap } from "./get-level-map";
import { authenticate } from "../middleware/authenticate";
import { getLevel } from "./get-level";


export const LevelRouter = Router();
LevelRouter.use(authenticate);

LevelRouter.get("/", (req: Request, res: Response) => tryProcess(req, res, getLevelMap));
LevelRouter.get("/:id", (req: Request, res: Response) => tryProcess(req, res, getLevel));