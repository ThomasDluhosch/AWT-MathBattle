export interface ILevelStatistics {
    number: number,
    username: string 
    completed: boolean
    medals?: Medals
    score?: number
}

export interface Medals {
    addition: boolean,
    subtraction: boolean,
    multiplication: boolean,
    division: boolean,
}