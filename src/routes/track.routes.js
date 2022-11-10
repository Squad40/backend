const Router = require('express');

const getTracksController = require('../modules/track/get-tracks/getTracksController');

const trackRoutes = new Router();

trackRoutes.get('/', getTracksController.list);
trackRoutes.get('/:id', getTracksController.getTrackById);

module.exports = trackRoutes;
