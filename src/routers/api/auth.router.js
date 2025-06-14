import { RouterHelper } from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { authController } from "../../controllers/auth.controller.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/register", ["PUBLIC"], passportCb("register"), authController.registerCb);
    this.postMeth("/login", ["PUBLIC"], passportCb("login"), authController.loginCb);
    this.postMeth("/signout", ["USER", "ADMIN"], authController.signoutCb);
    this.postMeth("/online", ["USER", "ADMIN"], authController.onlineCb);
    this.getMeth("/bad-auth", ["PUBLIC"], authController.badAuthCb);
    this.getMeth("/forbidden", ["PUBLIC"], authController.forbiddenCb);
    this.getMeth("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
    this.getMeth("/google/redirect", ["PUBLIC"], passportCb("google"), authController.loginCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export { authRouter };
