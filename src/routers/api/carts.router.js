import { RouterHelper } from "../../helpers/router.helper.js";
import { cartsController } from "../../controllers/carts.controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/", ["USER"], cartsController.createOne);
    this.getMeth("/", ["USER", "ADMIN"], cartsController.readAll);
    this.getMeth("/:id", ["USER"], cartsController.readById);
    this.putMeth("/:id", ["USER"], cartsController.updateById);
    this.deleteMeth("/:id", ["USER"], cartsController.destroyById);
  };
}

// const cartsRouter = new BaseRouter(cartsManager).getRouter();
const cartsRouter = new CartsRouter().getRouter();

export { cartsRouter };
