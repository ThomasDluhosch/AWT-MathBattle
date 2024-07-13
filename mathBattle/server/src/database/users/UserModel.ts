import { Model, Schema, model } from "mongoose";
import { GameMode, IUser } from "./IUser";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique:true,
        require: true
    },password: {
        type: String,
        require: true
    },
    options: {
        soundVolume: Number,
        fontSize: Number,
        gameMode: {
            type: Number, 
            enum: [GameMode.MULTIPLE_CHOICE, GameMode.TYPING], 
            //required: true 
        }
    },
   
});

export const UserModel = model<IUser>("User", userSchema);
