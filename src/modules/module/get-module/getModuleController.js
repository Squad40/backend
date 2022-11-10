const connection = require('../../../config/database/connection');

class GetModuleController {
  async listByTrackId(req, res) {
    const { trackId } = req.params;

    const modules = await connection('modulos')
      .select('modulos.*')
      .where('modulos.trilhaId', trackId);

    return res.json(modules);
  }

  async getById(req, res) {}
}

module.exports = new GetModuleController();
