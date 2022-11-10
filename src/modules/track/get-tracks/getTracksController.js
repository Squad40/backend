const connection = require('../../../config/database/connection');

class GetTracksController {
  async list(req, res) {
    const tracks = await connection('trilhas').select('*');

    for (const track of tracks) {
      track.classes = 0;
    }

    for (const track of tracks) {
      const modules = await connection('modulos')
        .select('*')
        .where('trilhaId', track.id);

      for (const singleModule of modules) {
        singleModule.aulas = await connection('aulas')
          .select('*')
          .where('moduloId', singleModule.id);

        track.classes = singleModule.aulas.length;
      }
    }

    return res.json(tracks);
  }

  async getTrackById(req, res) {
    const { id } = req.params;

    const [track] = await connection('trilhas').select('*').where('id', id);

    const modules = await connection('modulos')
      .select('*')
      .where('trilhaId', id);

    for (const singleModule of modules) {
      singleModule.aulas = await connection('aulas')
        .select('*')
        .where('moduloId', singleModule.id);
    }

    track.modules = modules;

    return res.json(track);
  }
}

module.exports = new GetTracksController();
