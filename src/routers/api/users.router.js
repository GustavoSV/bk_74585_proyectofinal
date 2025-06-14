import { RouterHelper } from "../../helpers/router.helper.js";
import { usersController } from "../../controllers/users.controller.js";

class UsersRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/", ["PUBLIC"], usersController.createOne);
    this.getMeth("/", ["ADMIN"], usersController.readAll);
    this.getMeth("/:id", ["USER", "ADMIN"], usersController.readById);
    this.putMeth("/:id", ["USER", "ADMIN"], usersController.updateById);
    this.deleteMeth("/:id", ["USER", "ADMIN"], usersController.destroyById);
  };
}

const usersRouter = new UsersRouter().getRouter();
export { usersRouter };