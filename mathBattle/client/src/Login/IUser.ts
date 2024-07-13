export interface IUser {
    username: string,
    password: string,
    options?: IOptions
}

export interface IOptions {
    gameMode: 'multiple choice' | 'type yourself';
    soundVolume: number,
    fontSize: number
}