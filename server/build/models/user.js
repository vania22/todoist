"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
var userSchema = new mongoose_1.default.Schema({
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
    var user = this;
    bcrypt_nodejs_1.default.genSalt(10, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_nodejs_1.default.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePasswords = function (plainPassword, callback) {
    bcrypt_nodejs_1.default.compare(plainPassword, this.password, function (err, result) {
        if (err)
            return callback(err);
        callback(null, result);
    });
};
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
