class CreateUserService {
  async execute({ name, email }) {
    return { name, email };
  }
}

module.exports = new CreateUserService();
