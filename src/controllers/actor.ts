import {NextFunction, Request, Response} from "express";
import  {IActor} from "../models/actors";
import actorsSchema from "../models/actors";
import mongoose from "mongoose";

const Actor = mongoose.model('actors', actorsSchema);

const CreateActors = async (req: Request<{}, {}, { data: IActor}>, res: Response) =>{
    console.log(req.body);
    try{
    const newActor = new Actor(req.body.data)
    const actorSaved = await newActor.save()
    }
    catch (error){
        console.log('error:', error)
        res.status(500).json({ error });
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
        res.status(500).json({ error });
    }
}

const GetOneActor = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const actorId = req.params.id
        console.log(actorId)
        const myActor = await Actor.findById(actorId)
        // @ts-ignore
        await res.json(myActor);
    }catch (error){
        console.log('error :', error)
        res.status(500).json({ error });
    }
}

const DeleteActor = async (req:Request, res:Response, next:NextFunction)=>{
    try {
    const actorId = req.params.id
    Actor.findById(actorId)
        await Actor.deleteOne({_id:actorId})
        console.log("Object deleted")
    }catch(error){
        console.log('error:', error);
        res.status(500).json({ error });
    }
}

const modifyActor = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        console.log('test Modify Actor')
        const actorObject = {
            ...req.body
        };
        Actor.findByIdAndUpdate(
            req.params.id,
            {...actorObject}
        ).then(()=>{
            if (!actorObject) {
                return res.status(404).json({ message: 'Acteur non trouvé' });
            }
            console.log('Object successfully modified:', actorObject);
            res.status(200).json({ message: 'Objet modifié !' });
        })
    }catch (error){
        console.log('Error updating project:', error);
        res.status(500).json({ error });
    }
}
const controller = {
    CreateActors,
    GetAllActors,
    GetOneActor,
    DeleteActor,
    modifyActor,
}

export default controller