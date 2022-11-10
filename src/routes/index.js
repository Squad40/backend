const Router = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const authMiddleware = require('../middleware/auth');

const trackRoutes = require('./track.routes');
const modulesRoutes = require('./module.routes');
const ratingRoutes = require('./userClass.routes');

const router = new Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

router.use(authMiddleware);

router.use('/track', trackRoutes);
router.use('/module', modulesRoutes);
router.use('/rating', ratingRoutes);

module.exports = router;
