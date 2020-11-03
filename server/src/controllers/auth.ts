const jwt = require('jwt-simple');
const User = require('../models/user');

const tokenForUser = (user: any) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, 'secret');
};

export const signUp = (req: any, res: any) => {
    const email = req.body.email;

    User.findOne({ email }, (err: any, user: any) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(400).json({ message: 'Email is in use' });
        } else {
            const user = new User(req.body);

            user.save((err: any, user: any) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    const { email, firstName, lastName, _id } = user;

                    return res.json({
                        token: tokenForUser(user),
                        user: {
                            email,
                            firstName,
                            lastName,
                            _id,
                        },
                    });
                }
            });
        }
    });
};

export const signIn = (req: any, res: any) => {
    const { email, firstName, lastName, _id } = req.user;

    return res.json({
        token: tokenForUser(req.user),
        user: {
            email,
            firstName,
            lastName,
            _id,
        },
    });
};
