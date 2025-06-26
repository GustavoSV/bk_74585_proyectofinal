import { BaseRouter } from "./base.router.js";
import { cartsManager } from "../../dao/factory.js";

const cartsRouter = new BaseRouter(cartsManager).getRouter();

export { cartsRouter };