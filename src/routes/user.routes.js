const Router = require('express');

const createUserController = require('../modules/user/create-user/createUserController');

const userRoutes = new Router();

userRoutes.post('/', createUserController.store);

module.exports = userRoutes;
