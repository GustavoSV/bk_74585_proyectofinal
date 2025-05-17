import { Router } from "express";

class BaseRouter {
  constructor(manager) {
    this.router = Router();
    this.manager = manager;
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/", async (req, res, next) => {
      try {
        const data = req.body;
        const one = await this.manager.createOne(data);
        res.status(201).json({
          method: req.method,
          url: req.originalUrl,
          response: one,
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.get("/", async (req, res, next) => {
      try {
        const filter = req.query;
        const all = await this.manager.readAll(filter);
        if (all.length > 0) {
          res.status(201).json({
            method: req.method,
            url: req.originalUrl,
            response: all,
          });
        } else {
          error = new Error("Not Found");
          error.statusCode = 404;
          throw error;
        }
      } catch (error) {
        next(error);
      }
    });

    this.router.get("/:id", async (req, res, next) => {
      try {
        const { id } = req.params;
        const one = await this.manager.readById(id);
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
      } catch (error) {
        next(error);
      }
    });

    this.router.put("/:id", async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const one = await this.manager.updateById(id, data);
        res.status(201).json({
          method: req.method,
          url: req.originalUrl,
          response: one,
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.delete("/:id", async (req, res, next) => {
      try {
        const { id } = req.params;
        const one = await this.manager.destroyById(id);
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
      } catch (error) {
        next(error);
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export { BaseRouter };
