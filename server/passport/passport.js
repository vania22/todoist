const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) return done(err);

            if (!user) return done(null, false);

            user.comparePasswords(password, (err, result) => {
                if (err) return done(err.message);

                if (!result) return done(null, false);

                return done(null, user);
            });
        });
    },
);

const jwtLogin = new JwtStrategy(
    {
        secretOrKey: 'secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
        User.findById(payload.sub, (err, user) => {
            if (err) return done(err);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    },
);

passport.use(jwtLogin);
passport.use(localLogin);
