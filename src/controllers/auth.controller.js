import { usersService } from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }

  registerCb = async (req, res) => res.json201(null, "Registered");

  loginCb = async (req, res) => {
    // configurar la cookie
    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    };
    res.cookie("token", req.user.token, opts).json200(req.user, "Logged In");
  };

  signoutCb = (req, res) =>
    res.clearCookie("token").json200(req.user._id, "User signout");

  onlineCb = async (req, res) => {
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await this.service.readById(dataToken?._id);
    if (!user) {
      return res.json401("Invalid credentials");
    }
    const { password, __v, createdAt, updatedAt, ...rest } = user;
    res.json200(rest, "User Online");
  };

  badAuthCb = (req, res, next) => res.json401();

  forbiddenCb = (req, res, next) => res.json403();
}

const authController = new AuthController();
export { authController };
