import { usersManager } from "../dao/factory.js";
import { UsersDTO } from "../dto/users.dto.js";

class UsersRepository {
  constructor() {
    this.manager = usersManager;
  }

  createOne = async (data) => await this.manager.createOne(new UsersDTO("INSERT", data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readBy = async (filter) => await this.manager.readBy(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data); //new UsersDTO("UPDATE", data));
  destroyById = async (id) => await this.manager.destroyById(id);
}

const usersRepository = new UsersRepository();
export { usersRepository };
