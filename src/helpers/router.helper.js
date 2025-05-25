import { Router } from "express";
import setupResponses from "../middlewares/setupResponses.mid.js";
import setupPolicies from "../middlewares/setupPolicies.mid.js";

class RouterHelper {
  constructor() {
    this.router = Router();
    this.useMeth(setupResponses);
  }

  getRouter = () => this.router;

  applyCallbacks = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    });

  applyCallbacksToRender = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        res.status(error.statusCode || 500).render("error", { error });
      }
    });

  postMeth = (path, policies, ...cbs) => this.router.post(path, setupPolicies(policies), this.applyCallbacks(cbs));
  getMeth = (path, policies, ...cbs) => this.router.get(path, setupPolicies(policies), this.applyCallbacks(cbs));
  putMeth = (path, policies, ...cbs) => this.router.put(path, setupPolicies(policies), this.applyCallbacks(cbs));
  deleteMeth = (path, policies, ...cbs) => this.router.delete(path, setupPolicies(policies), this.applyCallbacks(cbs));
  useMeth = (path, ...cbs) => this.router.use(path, this.applyCallbacks(cbs));
  renderMeth = (path, policies, ...cbs) => this.router.use(path, setupPolicies(policies), this.applyCallbacksToRender(cbs));
}

export { RouterHelper };
