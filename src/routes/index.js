const Router = require('express');
const userRoutes = require('./user.routes');

const router = new Router();

router.use('/user', userRoutes);

module.exports = router;
