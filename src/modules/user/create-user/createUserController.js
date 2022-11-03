const createUserService = require('./createUserService');

class CreateUserController {
  async store(req, res) {
    const { name, email } = req.body;
    const user = await createUserService.execute({ name, email });
    return res.status(201).json(user);
  }
}

module.exports = new CreateUserController();
