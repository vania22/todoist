const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 32,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 32,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
