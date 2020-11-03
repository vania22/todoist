const express = require('express');
const router = express.Router();
const passportService = require('../passport/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const { createList, getList } = require('../controllers/list');

router.post('/list', requireAuth, createList);
router.get('/list/:id', requireAuth, getList);

module.exports = router;
