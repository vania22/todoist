const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, (err, result) => {
        if (err) return callback(err);

        callback(null, result);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
