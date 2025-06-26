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
    this.postMeth("/signout", ["PUBLIC", "USER", "ADMIN"], authController.signoutCb);  
    this.postMeth("/online", ["USER", "ADMIN"], authController.onlineCb);
    this.postMeth("/new-password", ["PUBLIC"], authController.newPasswordCb);
    this.getMeth("/bad-auth", ["PUBLIC"], authController.badAuthCb);
    this.getMeth("/forbidden", ["PUBLIC"], authController.forbiddenCb);
    this.getMeth("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
    this.getMeth("/google/redirect", ["PUBLIC"], passportCb("google"), authController.loginCb);
    this.getMeth("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyUserCb);
    this.getMeth("/change-password/:id/:email", ["USER", "ADMIN"], authController.changePasswordCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export { authRouter };
