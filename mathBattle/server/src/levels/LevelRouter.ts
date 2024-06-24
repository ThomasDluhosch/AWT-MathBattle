import { Router } from "express";
import { Request, Response } from "express";
import { tryProcess } from "../helper/tryProcess";
import { getLevelMap } from "./get-level-map";
import { authenticate } from "../middleware/authenticate";
import { getLevel } from "./get-level";
import { getLevelBattle } from "./get-level-battle";
import { postLevelSuccess } from "./post-level-success";


export const LevelRouter = Router();
LevelRouter.use(authenticate);

LevelRouter.get("/", (req: Request, res: Response) => tryProcess(req, res, getLevelMap));
LevelRouter.get("/:id", (req: Request, res: Response) => tryProcess(req, res, getLevel));
LevelRouter.get("/:id/battle", (req: Request, res: Response) => tryProcess(req, res, getLevelBattle));
LevelRouter.post("/:id/success", (req: Request, res: Response) => tryProcess(req, res, postLevelSuccess));