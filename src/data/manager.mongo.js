import User from "./models/users.model.js";
import Cart from "./models/carts.model.js";
import Product from "./models/products.model.js";

class ManagerMongo {
  constructor(model) {
    this.model = model;
  }

  createOne = async (data) => {
    try {
      await this.model.create(data);
    } catch (error) {
      console.log("createOne ERROR:", error);
      throw error;
    }
  };
  readAll = async (filter) => await this.model.find(filter).lean();
  readBy = async (data) => await this.model.findOne(data).lean();
  readById = async (id) => await this.model.findById(id).lean();
  updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data);
  destroyById = async (id) => await this.model.findByIdAndDelete(id);
}

const userManager = new ManagerMongo(User);
const productsManager = new ManagerMongo(Product);
const cartsManager = new ManagerMongo(Cart);

export { userManager, productsManager, cartsManager };
