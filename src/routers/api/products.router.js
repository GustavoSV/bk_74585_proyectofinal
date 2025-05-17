import { BaseRouter } from "./base.router.js";
import { productsManager } from "../../data/manager.mongo.js";

const productsRouter = new BaseRouter(productsManager).getRouter();

export { productsRouter };
