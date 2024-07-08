export interface ILevelBattle {
    monsterPicture: string,
    monsterHealth: number, 
    highscore: number
    tasks: [
        {
            task: String,
            solution: number
        }
    ]
}