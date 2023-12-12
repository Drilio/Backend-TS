import {Schema} from 'mongoose';


export interface IUser{
    _id:string,
    password: string,
    name: string,
    mail: string,
}

const usersSchema = new Schema<IUser>({
    password: {type: String},
    name: {type: String},
    mail: {type: String}
})

export default  usersSchema