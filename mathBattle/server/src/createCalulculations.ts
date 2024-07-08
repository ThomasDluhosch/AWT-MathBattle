import { readFileSync } from "fs";
import { CalcType, ICalculation } from "./database/calculations/ICalculations";
import { CalculationsModel } from "./database/calculations/CalculationsModel";

//  createCalculations();


export async function createCalculations() {
    const calculationsData = JSON.parse(readFileSync('calculations.json', 'utf8'));

    // Prepare the data to be inserted into the database
    let calculations: ICalculation[] = [];
    for (const difficultyLevel of Object.keys(calculationsData.addition)) {
        for (const task of calculationsData.addition[difficultyLevel]) {
            const [num1, num2] = task.split('+').map(Number);
            calculations.push({
                difficulty: parseInt(difficultyLevel),
                task: task,
                solution: num1 + num2,
                type: CalcType.ADD
            });
        };
        await CalculationsModel.insertMany(calculations);
        calculations = [];
        await new Promise(r => setTimeout(r, 5000));
    }

}
