import {NextFunction, Request} from "express";
import Actors, {IActor} from "../models/actors";
import actorsSchema from "../models/actors";
import mongoose from "mongoose";

const Actor = mongoose.model('actors', actorsSchema);

const CreateActors = async (req: Request<{}, {}, IActor>, res: Response) =>{
    console.log(req.body);
    const {name, lastname} = req.body;
    try{
    const newActor = new Actor(name, lastname)
    const actorSaved = await newActor.save()
    }
    catch (error){
        console.log('error :', error)
    }
}

const GetAllActors = async (req:Request,res:Response, next:NextFunction) => {
    try{
        const allMyActors: IActor[] = await Actor.find({})
        console.log('test getallactors')
        // @ts-ignore
        await res.json(allMyActors)
    }catch(error){
        console.log('error :', error)
    }
}


const controller = {
    CreateActors,
    GetAllActors,
}

export default controller