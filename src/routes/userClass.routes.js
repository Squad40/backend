const Router = require('express');

const getAverageRatingController = require('../modules/rating/get-average/getAverageRatingController');
const postRatingController = require('../modules/rating/post-rating/postRatingController');

const ratingRoutes = new Router();

ratingRoutes.post('/:aulaId', postRatingController.post);
ratingRoutes.get('/:aulaId', getAverageRatingController.getAverageRating);

module.exports = ratingRoutes;
