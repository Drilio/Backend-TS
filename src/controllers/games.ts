import {NextFunction, Request, Response} from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import gamesSchema, {IGame} from "../models/game";
const Game = mongoose.model('game',gamesSchema);


const createGame = async (req: Request<{}, {}, { data: IGame}>, res: Response) =>{
    console.log(req.body);
    try{
        const newGame = new Game(req.body.data)
        const gameSaved = await newGame.save()
    }
    catch (error){
        console.log('error:', error)
        res.status(500).json({ error });
    }
}

const GetOneGame = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const gameId = req.params.id
        console.log(gameId)
        const myGame = await Game.findById(gameId)
        // @ts-ignore
        await res.json(myGame);
    }catch (error){
        console.log('error :', error)
        res.status(500).json({ error });
    }
}
const getAllGames = async (req:Request,res:Response,next:NextFunction) => {
    console.log("getGames reach")
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
                    data: {
                        user_id: user.id,
                        joueur1: user.login,
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
    getAllGames,
    createGame,
    GetOneGame
}

export default controller