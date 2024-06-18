import { Response,Request } from "express";
import { UserModel } from "../database/users/UserModel";
import { hashPassword } from "./hashing";
import { IUser } from "../database/users/IUser";

export async function registerUser(req: Request , res:Response ) {
    try {
      // ** Get The User Data From Body ;
      const user = req.body;
  
      // ** destructure the information from user;
      const { username, password } : IUser = user;
  
      // ** Check the email all ready exist  in database or not ;
      // ** Import the user model from "./models/user";
  
      const userFromDb = await UserModel.findOne({
        username: username,
      });
  
      // ** Add a condition if the user exist we will send the response as email all ready exist
      if (userFromDb) {
        res.status(400).json({
          status: 400,
          message: "Username already in use",
        });
         return;
      }
  
      // ** if not create a new user ;
      // !! Don't save the password as plain text in db . I am saving just for demonstration.
      // ** You can use bcrypt to hash the plain password.
  
      const hashedPwd = hashPassword(password);
      // now create the user;
      const newUser = await UserModel.create({
        username,
        hashedPwd
      });
  
      // Send the newUser as  response;
      res.status(200).json({
        status: 201,
        success: true,
        message: " User created Successfully",
        user: newUser,
      });
    } catch (error: any) {
      // console the error to debug
      console.log(error);
  
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }
  }