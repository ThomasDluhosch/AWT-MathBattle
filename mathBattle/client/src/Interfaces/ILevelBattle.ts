import { GameMode } from "./IOptions"

export interface ILevelBattle {
    monsterPicture: string,
    gameMode: GameMode,
    monsterHealth: number, 
    highscore: number
    tasks: [
        {
            task: String,
            solution: number
        }
    ]
}