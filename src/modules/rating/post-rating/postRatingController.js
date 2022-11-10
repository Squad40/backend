const yup = require('yup');
const connection = require('../../../config/database/connection');

class PostRatingController {
  async post(req, res) {
    const { userId } = req;
    const { aulaId } = req.params;
    const { nota } = req.body;

    const schema = yup.object().shape({
      nota: yup.number().min(1).max(5),
    });

    if (!(await schema.isValid({ nota }))) {
      return res.status(400).json({ error: 'Informe uma nota valida' });
    }

    const [rateExists] = await connection('usuarios_aulas')
      .select('usuarios_aulas.*')
      .where('usuarios_aulas.usuarioId', userId)
      .andWhere('usuarios_aulas.aulaId', aulaId);

    if (rateExists) {
      await connection('usuarios_aulas')
        .update({ nota })
        .where('usuarios_aulas.usuarioId', userId)
        .andWhere('usuarios_aulas.aulaId', aulaId);
    } else {
      await connection('usuarios_aulas').insert({
        usuarioId: userId,
        aulaId,
        nota,
      });
    }

    return res.status(200).json({ message: 'Nota inserida com sucesso' });
  }
}

module.exports = new PostRatingController();
