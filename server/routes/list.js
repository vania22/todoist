const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const {
    createList,
    getList,
    updateList,
    deleteList,
} = require('../controllers/list');

router.post('/list', requireAuth, createList);
router.get('/list/:id', requireAuth, getList);
router.patch('/list/:id', requireAuth, updateList);
router.delete('/list/:id', requireAuth, deleteList);

module.exports = router;
