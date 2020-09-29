const express = require('express');
const HomeRouter = require('./HomeRouter');
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');

const router = express.Router();

router.use('/', HomeRouter);
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);

module.exports = router;
