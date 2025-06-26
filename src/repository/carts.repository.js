import { cartsManager } from "../dao/factory.js";
import { CartsDTO } from "../dto/carts.dto.js"

class CartsRepository {
  constructor() {
    this.manager = cartsManager;
  }

  createOne = async (data) => await this.manager.createOne(new CartsDTO("INSERT", data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readBy = async (filter) => await this.manager.readBy(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const cartsRepository = new CartsRepository();
export { cartsRepository };
