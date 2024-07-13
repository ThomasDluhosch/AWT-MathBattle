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
import path from "path";
config();

const app: Express = express();
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


const PORT: string | number = process.env.PORT || 1000;
const uri: string = process.env.DB_PATH || "";
openConnection(uri);

//ROUTERS
app.use("/api/users", UserRouter);
app.use("/api/levels", LevelRouter);

const clientDir = path.join(__dirname, "client");
app.get(`/`, (req, res) => {
    res.sendFile(path.join(clientDir, "index.html"));
});
app.use(`/assets/`, (req, res) => {
    res.sendFile(path.join(clientDir,"assets", req.path), (e : any) => {
        if (e?.message){
            console.log(e.message);
            res.status(500);
        } 
    });
});
app.use(`/public/`, (req, res) => {
    res.sendFile(path.join(clientDir, req.path), (e : any) => {
        if (e?.message){
            console.log(e.message);
            res.status(500);
        } 
    });
});


app.get(`/:routeId/`, (req, res) => {
    res.sendFile(path.join(clientDir, "index.html"));
});

app.get(`/:routeId/:routeId2/`, (req, res) => {
    res.sendFile(path.join(clientDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

// createLevels();

// createCalculations();

