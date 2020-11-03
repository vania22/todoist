import express from 'express';
const router = express.Router();

import passport from 'passport';
import passportService from '../passport/passport';
passportService();

const requireAuth = passport.authenticate('jwt', { session: false });

import {
    createTask,
    getTask,
    updateTask,
    deleteTask,
} from '../controllers/task';

router.post('/task/:listId', requireAuth, createTask);
router.get('/task/:id', requireAuth, getTask);
router.patch('/task/:id', requireAuth, updateTask);
router.delete('/task/:id', requireAuth, deleteTask);

export default router;
