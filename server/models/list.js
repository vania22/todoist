const { ObjectId } = require('bson');
const mongoose = require('mongoose');

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

const List = mongoose.model('List', listSchema);

module.exports = List;
