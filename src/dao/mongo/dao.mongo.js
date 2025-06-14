import User from "./models/users.model.js";
import Cart from "./models/carts.model.js";
import Product from "./models/products.model.js";

class DaoMongo {
  constructor(model) {
    this.model = model;
  }

  createOne = async (data) => await this.model.create(data);
  readAll = async (filter) => await this.model.find(filter).lean();
  readBy = async (data) => await this.model.findOne(data).lean();
  readById = async (id) => await this.model.findById(id).lean();
  updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data);
  destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const usersManager = new DaoMongo(User);
const productsManager = new DaoMongo(Product);
const cartsManager = new DaoMongo(Cart);

export { usersManager, productsManager, cartsManager };
