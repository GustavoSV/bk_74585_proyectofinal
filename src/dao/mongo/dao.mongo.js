import User from "./models/users.model.js";
import Cart from "./models/carts.model.js";
import Product from "./models/products.model.js";

class DaoMongo {
  constructor(model) {
    this.model = model;
  }

  readAll = async (filter) => await this.model.find(filter).lean();
  readBy = async (filter) => await this.model.findOne(filter).lean();
  readById = async (id) => await this.model.findById(id).lean();
  createOne = async (data) => {
    const one = await this.model.insertOne(data);
    return one;
  };
  updateById = async (id, data) => {
    const one = await this.model.findByIdAndUpdate(id, data);
    return one;
  }
  destroyById = async (id) => {
    const one = await this.model.findByIdAndDelete(id);
    return one;
  }
}

const usersManager = new DaoMongo(User);
const productsManager = new DaoMongo(Product);
const cartsManager = new DaoMongo(Cart);

export { usersManager, productsManager, cartsManager };
