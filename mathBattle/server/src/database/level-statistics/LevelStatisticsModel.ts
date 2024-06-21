import { ILevelStatistics } from './ILevelStatistics';
import { Model, Schema, model } from "mongoose";

const levelStatisticsSchema = new Schema<ILevelStatistics>({
    number: {
        type: Number,
        require: true
    },
    username: {
        type: String,
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
    },
    score: {
        type: Number
    },
   
});

export const LevelStatisticsModel = model<ILevelStatistics>("LevelStatistics", levelStatisticsSchema);
