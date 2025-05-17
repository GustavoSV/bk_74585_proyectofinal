import { Router } from "express";
import { cartsRouter } from "./api/carts.router.js";
import { productsRouter } from "./api/products.router.js";
import { usersRouter } from "./api/users.router.js";
import { authRouter } from "./api/auth.router.js";

const apiRouter = Router();

apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

export { apiRouter };
