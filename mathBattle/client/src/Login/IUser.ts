import { IOptions } from "../Interfaces/IOptions";

export interface IUser {
    username: string,
    password: string,
    options?: IOptions
}
