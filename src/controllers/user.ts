import { Request, Response} from "express";
import {hash, compare} from "bcrypt"
import 'dotenv/config';
import mongoose from "mongoose";
import usersSchema  from "../models/user";
import jwt from 'jsonwebtoken';

const User = mongoose.model('user',usersSchema);
 const signup = async (req: Request, res: Response) =>{
    console.log(req.body);
    const {name, mail, password } = req.body;
    console.log('name' ,name)
    try{
        const passwordHash = await hash(password, 10)
        const userData = {
            name: name,
            mail: mail,
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
                email: mail,
                name: name,
                authToken: authToken,            }
        })
}catch(error){
        console.error(error);
        return res.status(500).json({ error: `Internal Error` });
    }
 }

const login = async (req: Request, res: Response) =>{
    console.log(req.body);
    try{
        const user = await User.findOne({mail: req.body.mail})
       console.log('user :', user);
        if(user === null){
            res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' });
        }else{
            const passwordCorrect = await compare(req.body.data.password, user.password);
            if(passwordCorrect){
                const jwtOptions = {
                    expiresIn: '24h',
                };
                const authToken = jwt.sign(user, process.env.AUTH_TOKEN_KEY!, jwtOptions);
                return res.status(200).json({
                    success: true,
                    user: {
                        user_id: user.id,
                        email: user.mail,
                        name: user.name,
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