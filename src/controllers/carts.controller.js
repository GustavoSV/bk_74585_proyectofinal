import { cartsServices } from "../services/carts.service.js";

class CartsController {
  constructor() {
    this.services = cartsServices;
  }

  createOne = async (req, res) => {
    const data = req.body;
    const one = await this.services.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  };

  readAll = async (req, res) => {
    const filter = req.query;
    const all = await this.services.readAll(filter);
    if (all.length > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  };

  readById = async (req, res) => {
    const { id } = req.params;
    const one = await this.services.readById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  };

  updateById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    const one = await this.services.updateById(id, data);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  };

  destroyById = async (req, res) => {
    const { id } = req.params;
    const one = await this.services.destroyById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  };
}

const cartsController = new CartsController();
export { cartsController };
