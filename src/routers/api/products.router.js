import { productsController } from "../../controllers/products.controller.js";
import { RouterHelper } from "../../helpers/router.helper.js";

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
    // this.controller = productsController;
  }

  init = () => {
    this.postMeth("/", ["ADMIN"], productsController.createOne);
    this.getMeth("/", ["PUBLIC"], productsController.readAll);
    this.getMeth("/:id", ["PUBLIC"], productsController.readById);
    this.putMeth("/:id", ["ADMIN"], productsController.updateById);
    this.deleteMeth("/:id", ["ADMIN"], productsController.destroyById);
  };
}

const productsRouter = new ProductsRouter().getRouter();
export { productsRouter };
