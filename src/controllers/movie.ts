import {NextFunction, Request, Response} from "express";
import  {IMovie} from "../models/movie";
import moviesSchema from "../models/movie";
import mongoose from "mongoose";
import actors from "../models/actors";

const Movie = mongoose.model('movies', moviesSchema);

const CreateMovies = async (req: Request<{}, {}, { data: IMovie}>, res: Response) =>{
    console.log(req.body);
    try{
        const newMovie = new Movie(req.body.data);
        const movieSaved = await newMovie.save()
    }
    catch (error){
        console.log('error:', error)
        res.status(500).json({ error });
    }
}

const GetAllMovie = async (req:Request,res:Response, next:NextFunction) => {
    try{
        const allMyMovie: IMovie[] = await Movie.find({}).populate('actors')
        console.log('test getAllMovie')
        // @ts-ignore
        await res.json(allMyMovie)
    }catch(error){
        console.log('error :', error)
        res.status(500).json({ error });
    }
}

const GetOneMovie = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const movieId = req.params.id
        console.log(movieId)
        // @ts-ignore
        const myMovie = await Movie.findById(movieId).populate('actors');
        // @ts-ignore
        await res.json(myMovie);
    }catch (error){
        console.log('error :', error)
        res.status(500).json({ error });
    }
}

const DeleteMovie = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const movieId = req.params.id
        Movie.findById(movieId)
        await Movie.deleteOne({_id:movieId})
        console.log("Object deleted")
    }catch(error){
        console.log('error:', error);
        res.status(500).json({ error });
    }
}

const modifyMovie = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        console.log('test Modify Movie')
        const movieObject = {
            ...req.body
        };
        Movie.findByIdAndUpdate(
            req.params.id,
            {...movieObject}
        ).then(()=>{
            if (!movieObject) {
                return res.status(404).json({ message: 'Acteur non trouvé' });
            }
            console.log('Object successfully modified:', movieObject);
            res.status(200).json({ message: 'Objet modifié !' });
        })
    }catch (error){
        console.log('Error updating project:', error);
        res.status(500).json({ error });
    }
}
const controller = {
    CreateMovies,
    GetAllMovie,
    GetOneMovie,
    DeleteMovie,
    modifyMovie,
}

export default controller