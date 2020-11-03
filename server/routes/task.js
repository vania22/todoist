const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/task');

router.post('/task/:listId', requireAuth, createTask);
router.get('/task/:id', requireAuth, getTask);
router.patch('/task/:id', requireAuth, updateTask);
router.delete('/task/:id', requireAuth, deleteTask);

module.exports = router;
