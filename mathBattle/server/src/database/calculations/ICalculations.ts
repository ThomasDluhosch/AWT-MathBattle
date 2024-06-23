export interface ICalculation {
    type: CalcType,
    difficulty: number,
    task: string
    solution: number
}

export enum CalcType {
    ADD,
    SUBTRACT,
    MULTIPLICATE,
    DIVIDE
}