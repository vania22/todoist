const { ObjectId } = require('bson');
const mongoose = require('mongoose');

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
        list: { type: ObjectId, ref: 'List' },
    },
    { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
