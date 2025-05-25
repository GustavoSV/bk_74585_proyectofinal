// import { BaseRouter } from "./base.router.js";
import { RouterHelper } from "../../helpers/router.helper.js";
import { cartsManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await cartsManager.createOne(data);
  res.status(201).json({
    method: req.method,
    url: req.originalUrl,
    response: one,
  });
};

const readAll = async (req, res) => {
  const filter = req.query;
  const all = await cartsManager.readAll(filter);
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

const readById = async (req, res) => {
  const { id } = req.params;
  const one = await cartsManager.readById(id);
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

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const one = await cartsManager.updateById(id, data);
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

const destroyById = async (req, res) => {
  const { id } = req.params;
  const one = await cartsManager.destroyById(id);
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

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/", ["USER"], createOne);
    this.getMeth("/", ["USER"], readAll);
    this.getMeth("/:id", ["USER"], readById);
    this.putMeth("/:id", ["USER"], updateById);
    this.deleteMeth("/:id", ["USER"], destroyById);
  };
}

// const cartsRouter = new BaseRouter(cartsManager).getRouter();
const cartsRouter = new CartsRouter().getRouter();

export { cartsRouter };
