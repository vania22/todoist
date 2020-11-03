import { IList } from './list';
import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export enum DateRange {
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    NEXT_WEEK = 'Next 7 days',
}

export interface ITask extends mongoose.Document {
    name: string;
    completed: boolean;
    dateRange: DateRange;
    listId: IList['_id'];
}

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
        dateRange: {
            type: String,
            default: 'Today',
            enum: ['Today', 'Tomorrow', 'Next 7 days'],
        },
        listId: { type: ObjectId, ref: 'List' },
    },
    { timestamps: true },
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
