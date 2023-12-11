import {Schema} from 'mongoose';
export interface IActor {
    firstname: string,
    lastname: string,
}

const actorsSchema = new Schema<IActor>({
    firstname: {type: String},
    lastname: {type: String},
})

export default  actorsSchema