import { usersRepository } from "../repository/users.repository.js";

class UsersService {
  constructor() {
    this.repository = usersRepository;
  }

  createOne = async (data) => await this.repository.createOne(data);
  readAll = async (filter) => await this.repository.readAll(filter);
  readBy = async (filter) => await this.repository.readBy(filter);
  readById = async (id) => await this.repository.readById(id);
  updateById = async (id, data) => await this.repository.updateById(id, data);
  destroyById = async (id) => await this.repository.destroyById(id);
}

const usersService = new UsersService();
export { usersService };
