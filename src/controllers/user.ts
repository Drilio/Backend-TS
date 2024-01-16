import {NextFunction, Request, Response} from "express";
import {hash, compare} from "bcrypt"
import 'dotenv/config';
import mongoose from "mongoose";
import usersSchema, {IUser} from "../models/user";
import jwt from 'jsonwebtoken';

const User = mongoose.model('user',usersSchema);
 const signup = async (req: Request, res: Response) =>{
    console.log(req.body);
    const { login, password } = req.body;
    console.log('login' ,login)
    try{
        const passwordHash = await hash(password, 10)
        const userData = {
            login: login,
            password: passwordHash,
        }
        const newUser = new User(userData);
        const userSaved = await newUser.save();
        const jwtOptions = {
            expiresIn: '24h',
        };

        const authToken = jwt.sign(userData, process.env.AUTH_TOKEN_KEY!, jwtOptions);
        return res.status(200).json({
            success: true,
            user:{
                user_id: newUser.id,
                login: login,
                password: password,
                authToken: authToken,
            }
        })
}catch(error){
        console.error(error);
        return res.status(500).json({ error: ` Internal Error` });
    }
 }

const login = async (req: Request, res: Response) =>{
    console.log(req.body);
    try{
        const user = await User.findOne({login: req.body.login})
       console.log('user :', user);
        if(user === null){
            return res.status(401).json({ message: 'Paire identifiant / mot de passe incorrect' });
        }else{
            const passwordCorrect = await compare(req.body.password, user.password);
            console.log("passwordCorrect",passwordCorrect)
            if(passwordCorrect){
                const jwtOptions = {
                    expiresIn: '24h',
                };
                console.log('user after find user', user);
                const authToken = jwt.sign(user.toObject(), process.env.AUTH_TOKEN_KEY!, jwtOptions);
                return res.status(200).json({
                    success: true,
                    data: {
                        jwtToken: authToken,
                    },
                });
            }else{
                console.log('test')
                return res.status(400).json({error: 'Invalid Credentials'});
            }
        }
    }catch (error){
        console.error(error);
        return res.status(500).json({ error: `Server Error` });
    }
}


const isconnect = async (req:Request,res:Response,next:NextFunction) => {
     // try{
     //     console.log('isconnect test')
     //     const authorization = req.headers.authorization!.split(' ')[1];
     //     const decoded = jwt.decode(authorization) as IUser
     //     const userMail = decoded.mail
     //     const filter = {mail: userMail}
     //     const connectedUser = await User.findOne(filter);
     //     if(connectedUser === null){
     //         res.status(401).json({ message: 'l\'utilisateur n\'existe pas' });
     //     }else{
     //         res.status(200).json({ message: 'Token valide' });
     //     }
     // }catch (error) {
     //     res.status(200).json({ message: 'Token valide' });
     // }
}
const controller = {
    signup,
    login,
    isconnect
}

export default controller;