import { IUser } from './user';
import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IList extends mongoose.Document {
    name: string;
    color: string;
    user: IUser['_id'];
}

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
    },
    color: {
        type: String,
        required: true,
    },
    user: { type: ObjectId, ref: 'user' },
});

const List = mongoose.model<IList>('List', listSchema);

export default List;
