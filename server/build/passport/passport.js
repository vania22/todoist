"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var passport_jwt_2 = require("passport-jwt");
// const JwtStrategy = require('passport-jwt').Strategy;
var user_1 = __importDefault(require("../models/user"));
var passport_local_1 = require("passport-local");
var passportService = function () {
    var localLogin = new passport_local_1.Strategy({ usernameField: 'email' }, function (email, password, done) {
        user_1.default.findOne({ email: email }, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);
            user.comparePasswords(password, function (err, result) {
                if (err)
                    return done(err.message);
                if (!result)
                    return done(null, false);
                return done(null, user);
            });
        });
    });
    var jwtLogin = new passport_jwt_1.Strategy({
        secretOrKey: 'secret',
        jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, function (payload, done) {
        user_1.default.findById(payload.sub, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
    passport_1.default.use(jwtLogin);
    passport_1.default.use(localLogin);
};
exports.default = passportService;
