const jwt = require('jwt-simple');
const User = require('../models/user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, 'secret');
};

exports.signUp = (req, res) => {
    const email = req.body.email;

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(400).json({ message: 'Email is in use' });
        } else {
            const user = new User(req.body);

            user.save((err, user) => {
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

exports.signIn = (req, res) => {
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
