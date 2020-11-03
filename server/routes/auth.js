const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

const requireSignIn = passport.authenticate('local', { session: false });

const { signUp, signIn } = require('../controllers/auth');

router.post('/signup', signUp);
router.post('/signin', requireSignIn, signIn);

module.exports = router;
