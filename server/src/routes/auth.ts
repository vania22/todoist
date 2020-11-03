import express from 'express';
const router = express.Router();

import passport from 'passport';
import passportService from '../passport/passport';
passportService();

const requireSignIn = passport.authenticate('local', { session: false });

import { signUp, signIn } from '../controllers/auth';

router.post('/signup', signUp);
router.post('/signin', requireSignIn, signIn);

export default router;
