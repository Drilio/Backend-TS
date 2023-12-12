import { Request, Response} from "express";
import bcrypt from 'bcrypt';
import 'dotenv/config';
import mongoose from "mongoose";
import usersSchema, {IUser} from "../models/user";
import jwt from 'jsonwebtoken';

const User = mongoose.model('user',usersSchema);
 const signup = async (req: Request<{}, {}, { data: IUser}>, res: Response) =>{
    console.log(req.body);
    const {name, mail, password } = req.body.data;
    try{
        const passwordHash = await  bcrypt.hash(password, process.env.ENCRYPTION_KEY)
        const userData = {
            name: name,
            mail: mail,
            password: passwordHash,
        }
        const newUser = new User(userData);

        const jwtOptions = {
            expiresIn: '24h',
        };

        const authToken = jwt.sign(newUser, process.env.AUTH_TOKEN_KEY, jwtOptions);
        return res.status(200).json({
            success: true,
            user:{
                user_id: newUser.id,
                email: mail,
                name: name,
                authToken: authToken,            }
        })
}catch(error){
        console.error(error);
        return res.status(500).json({ error: `Internal Error` });
    }
 }

 const login = async (req: Request<{}, {}, { data: IUser}>, res: Response) =>{
     console.log(req.body);
     try{
         const user = User.findOne({mail: req.body.mail})
         console.log(user)
         if(user === null){
             res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' });
         }else{
             const passwordCorrect = await bcrypt.compare(req.body.password, user.data.password);
             if(passwordCorrect){
                 const jwtOptions = {
                     expiresIn: '24h',
                 };
                 const authToken = jwt.sign(user.data, process.env.AUTH_TOKEN_KEY, jwtOptions);
                 return res.status(200).json({
                     success: true,
                     user: {
                         user_id: user.id,
                         email: user.data.email,
                         name: user.data.name,
                         auth_token: authToken,
                     },
                 });
             }
         }
         return res.status(400).json({error: 'Invalid Credentials'});
     }catch (error){
         console.error(error);
         return res.status(500).json({ error: `Server Error` });
     }
 }

const controller = {
    signup,
    login,
}

export default controller;