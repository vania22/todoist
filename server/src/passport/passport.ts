import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
// const JwtStrategy = require('passport-jwt').Strategy;
import User from '../models/user';
import { Strategy as LocalStrategy } from 'passport-local';

const passportService = () => {
    const localLogin = new LocalStrategy(
        { usernameField: 'email' },
        (email: string, password: string, done: any) => {
            User.findOne({ email }, (err: any, user: any) => {
                if (err) return done(err);

                if (!user) return done(null, false);

                user.comparePasswords(password, (err: any, result: any) => {
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
        (payload: any, done: any) => {
            User.findById(payload.sub, (err: any, user: any) => {
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
};

export default passportService;
