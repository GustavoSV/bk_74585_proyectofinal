import { cartsManager } from "../dao/mongo/dao.mongo.js";

class CartsServices {
  constructor() {
    this.manager = cartsManager;
  }

  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const cartsServices = new CartsServices();
export { cartsServices };
