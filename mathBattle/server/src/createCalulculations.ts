import { readFileSync } from "fs";
import { CalcType, ICalculation } from "./database/calculations/ICalculations";
import { CalculationsModel } from "./database/calculations/CalculationsModel";

//  createCalculations();


async function createCalculations() {
    const calculationsData = JSON.parse(readFileSync('calculations.json', 'utf8'));

    // Prepare the data to be inserted into the database
    const calculations : ICalculation[] = [];
    Object.keys(calculationsData.addition).forEach(difficultyLevel => {
        calculationsData.addition[difficultyLevel].forEach((task : string) => {
            const [num1, num2] = task.split(' + ').map(Number);
            calculations.push({
                difficulty: parseInt(difficultyLevel),
                task: task,
                solution: num1 + num2,
                type: CalcType.ADD
            });
        });
    });
    await CalculationsModel.insertMany(calculations);
}
