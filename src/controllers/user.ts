import {NextFunction} from "express";

exports.signup = (req:Request, res:Response, next:NextFunction) =>{
    console.log(req.body);


}