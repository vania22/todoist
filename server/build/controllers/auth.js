"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
var jwt = require('jwt-simple');
var User = require('../models/user');
var tokenForUser = function (user) {
    var timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, 'secret');
};
exports.signUp = function (req, res) {
    var email = req.body.email;
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(400).json({ message: 'Email is in use' });
        }
        else {
            var user_1 = new User(req.body);
            user_1.save(function (err, user) {
                if (err) {
                    return res.status(500).json(err);
                }
                else {
                    var email_1 = user.email, firstName = user.firstName, lastName = user.lastName, _id = user._id;
                    return res.json({
                        token: tokenForUser(user),
                        user: {
                            email: email_1,
                            firstName: firstName,
                            lastName: lastName,
                            _id: _id,
                        },
                    });
                }
            });
        }
    });
};
exports.signIn = function (req, res) {
    var _a = req.user, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, _id = _a._id;
    return res.json({
        token: tokenForUser(req.user),
        user: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            _id: _id,
        },
    });
};
