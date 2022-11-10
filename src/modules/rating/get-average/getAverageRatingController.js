const connection = require('../../../config/database/connection');

class GetAverageRatingController {
  async getAverageRating(req, res) {
    const { aulaId } = req.params;

    let [averageRating] = await connection('usuarios_aulas')
      .avg('nota as media')
      .where('usuarios_aulas.aulaId', aulaId);

    averageRating = averageRating.media;

    return res.status(200).json({ averageRating });
  }
}

module.exports = new GetAverageRatingController();
