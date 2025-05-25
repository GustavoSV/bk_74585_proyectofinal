import { RouterHelper } from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const registerCb = async (req, res) => res.json201(null, "Registered");

const loginCb = async (req, res) => {
  // configurar la cookie
  const opts = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    signed: true,
  };
  res.cookie("token", req.user.token, opts).json200(req.user, "Logged In");
};

const signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "User signout");

const onlineCb = async (req, res) => {
  const { token } = req.signedCookies;
  const dataToken = verifyToken(token);
  let user = await usersManager.readById(dataToken?._id);
  if (!user) {
    return res.json401("Invalid credentials");
  }
  const { password, __v, createdAt, updatedAt, ...rest } = user;
  res.json200(rest, "User Online");
};

const badAuthCb = (req, res, next) => res.json401();

const forbiddenCb = (req, res, next) => res.json403();

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.postMeth("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.postMeth("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.getMeth("/signout", ["USER", "ADMIN"], signoutCb);
    this.getMeth("/online", ["USER", "ADMIN"], onlineCb);
    this.getMeth("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));
    this.getMeth("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb);
    this.getMeth("/bad-auth", ["PUBLIC"], badAuthCb);
    this.getMeth("/forbidden", ["PUBLIC"], forbiddenCb);
  };
}

const authRouter = new AuthRouter().getRouter;
export { authRouter };
