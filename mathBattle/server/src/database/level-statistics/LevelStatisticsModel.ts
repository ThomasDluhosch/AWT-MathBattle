import { ILevelStatistics } from './ILevelStatistics';
import { Model, Schema, model } from "mongoose";

const levelStatisticsSchema = new Schema<ILevelStatistics>({
    number: {
        type: Number,
        unique:true,
        require: true
    },
    username: {
        type: String,
        unique:true,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    },
    medals: {
        addition: Boolean,
        subtraction: Boolean,
        multiplication: Boolean,
        division: Boolean,
        require: true
    },
    score: {
        type: Number
    },
   
});

export const LevelStatisticsModel = model<ILevelStatistics>("LevelStatistics", levelStatisticsSchema);
