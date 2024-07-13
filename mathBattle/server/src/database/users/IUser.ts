export interface IUser {
    username: string,
    password: string,
    options: IOptions
}

export enum GameMode {
    MULTIPLE_CHOICE,
    TYPING
}

export interface IOptions {
    gameMode: GameMode;
    soundVolume: number,
    fontSize: number
}