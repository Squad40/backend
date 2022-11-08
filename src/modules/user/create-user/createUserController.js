const yup = require('yup');
const bcrypt = require('bcryptjs');

const connection = require('../../../config/database/connection');

class CreateUserController {
  async store(req, res) {
    const { name, email, password, confirmPassword, phone, pronoum } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email('Favor informar um email valido').required(),
      password: yup.string().min(8).required('Favor informar uma senha valida'),
      confirmPassword: yup
        .string()
        .min(8)
        .required('Favor informar uma senha valida'),
      phone: yup
        .string()
        .min(8)
        .required('Favor informar um numero de telefone'),
      pronoum: yup.number().min(1).max(2).required('Favor informar um pronome'),
    });

    if (
      !(await schema.isValid({
        name,
        email,
        password,
        confirmPassword,
        phone,
        pronoum,
      }))
    ) {
      return res.status(400).json({ error: 'Favor informar os dados validos' });
    }

    const [userExists] = await connection('usuarios')
      .select('usuarios.*')
      .where('usuarios.email', '=', email);

    if (userExists) {
      return res.status(403).json({ error: 'Usuario ja existe' });
    }

    if (password !== confirmPassword) {
      return res.status(403).json({ error: 'As senhas nao sao iguais' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = {
      name,
      email,
      password: hashedPassword,
      phone,
      pronoum,
    };

    const [id] = await connection('usuarios').insert(user);

    if (!id) {
      return res.status(500).json({ error: 'Falha no cadastro' });
    }

    return res.status(201).json({
      id,
      ...user,
    });
  }
}

module.exports = new CreateUserController();
