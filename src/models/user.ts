import {Schema} from 'mongoose';


export interface IUser{
    id:string,
    password: string,
    name: string,
    mail: string,
}

const usersSchema = new Schema<IUser>({
    id: {type:String},
    password: {type: String},
    name: {type: String},
    mail: {type: String}
})

export default  usersSchema