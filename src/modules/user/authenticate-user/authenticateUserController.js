const yup = require('yup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authConfig = require('../../../config/auth');
const connection = require('../../../config/database/connection');

class AuthenticateUserController {
  async login(req, res) {
    const { email, password } = req.body;

    const schema = yup.object().shape({
      email: yup.string().email('Favor informar um email valido').required(),
      password: yup.string().min(8).required('Favor informar uma senha valida'),
    });

    if (!(await schema.isValid({ email, password }))) {
      return res.status(400).json({ error: 'Favor informar os dados validos' });
    }

    const [userExists] = await connection('usuarios')
      .select('usuarios.*')
      .where('usuarios.email', '=', email);

    if (!userExists) {
      return res.status(404).json({ error: 'Usuario nao existe' });
    }

    const checkPassword = (password) => {
      return bcrypt.compare(password, userExists.password);
    };

    if (!(await checkPassword(password))) {
      return res.status(401).json({ error: 'A senha esta errada.' });
    }

    return res.json({
      user: {
        id: userExists.id,
        name: userExists.name,
        email,
      },
      token: jwt.sign({ id: userExists.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new AuthenticateUserController();
