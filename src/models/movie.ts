import {Schema} from 'mongoose';
export interface IMovie{
    ReleaseDate: string,
    description: string,
    title: string,
    actors:[{ type: Schema.Types.ObjectId, ref: 'actors' }]
}

const moviesSchema = new Schema<IMovie>({
    ReleaseDate: {type: String},
    description: {type: String},
    title: {type: String},
    actors:[{ type: Schema.Types.ObjectId, ref: 'actors' }]
})

export default  moviesSchema