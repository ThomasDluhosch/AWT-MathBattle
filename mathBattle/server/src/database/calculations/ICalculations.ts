export interface ICalculation {
    type: CalcType,
    difficulty: number,
    task: string
    solution: number
}

export enum CalcType {
    ADD,
    SUBSTRACT,
    MULTIPLICATE,
    DIVIDE
}