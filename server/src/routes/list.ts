import express from 'express';
const router = express.Router();

import passport from 'passport';
import passportService from '../passport/passport';
passportService();

const requireAuth = passport.authenticate('jwt', { session: false });

import {
    createList,
    getList,
    updateList,
    deleteList,
} from '../controllers/list';

router.post('/list', requireAuth, createList);
router.get('/list/:id', requireAuth, getList);
router.patch('/list/:id', requireAuth, updateList);
router.delete('/list/:id', requireAuth, deleteList);

export default router;
