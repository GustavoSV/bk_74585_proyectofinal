import { productsManager } from "../dao/factory.js";
import { ProductsDTO } from "../dto/products.dto.js"

class ProductsRepository {
  constructor() {
    this.manager = productsManager;
  }

  createOne = async (data) => await this.manager.createOne(new ProductsDTO("INSERT", data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readBy = async (filter) => await this.manager.readBy(filter);
  readById = async (id) => await this.manager.readById(id);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const productsRepository = new ProductsRepository();
export { productsRepository };
