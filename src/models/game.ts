import {Schema} from 'mongoose';


export interface IGame{
    _id:string,
    joueur1: { type: Schema.Types.ObjectId, ref: 'user' },
    joueur2:  { type: Schema.Types.ObjectId, ref: 'user' },
    winner:  { type: Schema.Types.ObjectId, ref: 'user' },
    bestTime: Number,
    objective: Number,
}

const gamesSchema = new Schema<IGame>({
    joueur1: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    joueur2: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    winner: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    bestTime: Number,
    objective: Number,
})

export default  gamesSchema