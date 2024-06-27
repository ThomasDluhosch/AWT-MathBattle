export interface ILevel {
    number: number,
    completed: boolean,
    medals: Medals
}

export interface Medals {
    addition: boolean,
    subtraction: boolean,
    multiplication: boolean,
    division: boolean,
}