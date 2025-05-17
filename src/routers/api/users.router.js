import { BaseRouter } from "./base.router.js";
import { userManager } from "../../data/manager.mongo.js"

const usersRouter = new BaseRouter(userManager).getRouter();

export { usersRouter };