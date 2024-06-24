export interface IUser {
    username: string,
    password: string,
    options?: IOptions
}

export interface IOptions {
    gameTimer: boolean,
    soundVolume: number,
    fontSize: number
}