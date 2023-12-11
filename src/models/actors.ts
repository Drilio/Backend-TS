import {Schema, model, Model} from 'mongoose';
export interface IActor {
    id: string,
    name: string,
    lastname: string,
}

const actorsSchema = new Schema<IActor>({
    id: {type: String},
    name: {type: String},
    lastname: {type: String},
})

export default  actorsSchema