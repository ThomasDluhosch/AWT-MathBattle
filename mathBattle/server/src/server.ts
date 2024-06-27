import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import {config} from "dotenv";
import { openConnection } from "./database/open-connection";
import morgan from 'morgan';
import helmet from 'helmet';
import { UserRouter } from "./user/UserRouter";
import { LevelRouter } from "./levels/LevelRouter";
import { createLevels } from "./createLevels"
import { createCalculations } from "./createCalulculations";
config();

const app: Express = express();
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


const PORT: string | number = process.env.PORT || 1000;
const uri: string = process.env.DB_PATH || "";
console.log(uri);
openConnection(uri);

//ROUTERS
app.use("/api/users", UserRouter);
app.use("/api/levels", LevelRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

// createLevels();

// createCalculations();

