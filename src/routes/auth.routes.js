const Router = require('express');

const authenticateUserController = require('../modules/user/authenticate-user/authenticateUserController');

const authRoutes = new Router();

authRoutes.post('/', authenticateUserController.login);

module.exports = authRoutes;
