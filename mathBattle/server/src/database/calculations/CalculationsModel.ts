import { Model, Schema, model } from "mongoose";
import { CalcType, ICalculation } from "./ICalculations";

const calcSchema = new Schema<ICalculation>({
    difficulty: {
        type: Number,
        require: true
    },
    task: {
        type: String,
        require: true
    },
    solution: {
        type: Number,
        require: true
    },
    type: {
        type: Number,
        require: true,
        enum: [CalcType.ADD, CalcType.SUBTRACT, CalcType.MULTIPLICATE, CalcType.DIVIDE]
    },
   
});

export const CalculationsModel = model<ICalculation>("Calculation", calcSchema);
