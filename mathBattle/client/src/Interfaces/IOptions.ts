export enum GameMode {
    MULTIPLE_CHOICE,
    TYPING
}

export interface IOptions {
    gameMode: GameMode;
    soundVolume: number,
    fontSize: number
}