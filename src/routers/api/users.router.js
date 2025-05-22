import { BaseRouter } from "./base.router.js";
import { usersManager } from "../../data/manager.mongo.js"

const usersRouter = new BaseRouter(usersManager).getRouter();

export { usersRouter };