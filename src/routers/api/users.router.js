// import { BaseRouter } from "./base.router.js";
import { RouterHelper } from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const createOne = async (req, res) => {
  const data = req.body;
  const one = await usersManager.createOne(data);
  res.status(201).json({
    method: req.method,
    url: req.originalUrl,
    response: one,
  });
};

const readAll = async (req, res) => {
  const filter = req.query;
  const all = await usersManager.readAll(filter);
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
  const one = await usersManager.readById(id);
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
  const one = await usersManager.updateById(id, data);
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
  const one = await usersManager.destroyById(id);
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

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/", ["PUBLIC"], createOne);
    this.getMeth("/", ["ADMIN"], readAll);
    this.getMeth("/:id", ["USER", "ADMIN"], readById);
    this.putMeth("/:id", ["USER", "ADMIN"], updateById);
    this.deleteMeth("/:id", ["USER", "ADMIN"], destroyById);
  };
}

const usersRouter = new UsersRouter().getRouter();
export { usersRouter };