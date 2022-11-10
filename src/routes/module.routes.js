const Router = require('express');

const getModuleController = require('../modules/module/get-module/getModuleController');

const modulesRoutes = new Router();

modulesRoutes.get('/:trackId', getModuleController.listByTrackId);

module.exports = modulesRoutes;
