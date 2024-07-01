export interface ILevel {
    number: number,
    completed: boolean,
    locked?: boolean,
    medals: Medals
}

export interface Medals {
    addition: boolean,
    subtraction: boolean,
    multiplication: boolean,
    division: boolean,
}