import {NextFunction, Request, Response} from "express";
import 'dotenv/config';
import usersSchema, {IUser} from "../models/user";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
const Auth = mongoose.model('user',usersSchema);

const isconnect = async (req:Request,res:Response,next:NextFunction) => {
    console.log("isconnect reach")
    try{
        try{
            const authorization = req.headers.authorization!.split(' ')[1];
            const decoded = jwt.verify(authorization, process.env.AUTH_TOKEN_KEY!) as IUser
            console.log(decoded)
            const userLogin = decoded.login
            const user = await Auth.findOne({login: userLogin});
            if(user == null){
                res.status(401).json({ message: 'Incorrect Token' });
            }else{
                return res.status(200).json({
                    success: true,
                    user: {
                        user_id: user.id,
                        login: user.login,
                    },
                });
            }

        }catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Server Error` });
        }
}catch(error){
    return res.status(500).json({error: 'Server Error'});
}
}


    const controller = {
        isconnect
    }

    export default controller