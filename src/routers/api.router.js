import { RouterHelper } from "../helpers/router.helper.js";
import { cartsRouter } from "./api/carts.router.js";
import { productsRouter } from "./api/products.router.js";
import { usersRouter } from "./api/users.router.js";
import { authRouter } from "./api/auth.router.js";

class ApiRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.useMeth("/carts", cartsRouter);
    this.useMeth("/products", productsRouter);
    this.useMeth("/users", usersRouter);
    this.useMeth("/auth", authRouter);
  };
}

const apiRouter = new ApiRouter().getRouter();
export { apiRouter };
