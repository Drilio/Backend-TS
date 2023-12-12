import {Schema} from 'mongoose';
import moviesSchema from "./movie";


export interface IUser{
    password: string,
    name: string,
    mail: string,
}

const usersSchema = new Schema<IUser>({
    password: {type: String},
    name: {type: String},
    mail: {type: String}
})

export default  moviesSchema