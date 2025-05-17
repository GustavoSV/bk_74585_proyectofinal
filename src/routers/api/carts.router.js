import { BaseRouter } from "./base.router.js";
import { cartsManager } from "../../data/manager.mongo.js";

const cartsRouter = new BaseRouter(cartsManager).getRouter();

export { cartsRouter };