import { usersService } from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";
import crypto from "crypto";
import { resetPassword } from "../helpers/resetPassw.helper.js";
import { compareHash, createHash } from "../helpers/hash.util.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }

  registerCb = async (req, res) => res.json201(null, "Registered");

  loginCb = async (req, res) => {
    const opts = {  // configurar la cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    };
    res.cookie("token", req.user.token, opts).json200(req.user, "Logged In");
  };

  signoutCb = (req, res) => {
    res.clearCookie("token").json200(req.user, "User signout");
  };

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

  verifyUserCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await this.service.readBy({ email, verifyCode })
    if (user) {
      await this.service.updateById(user._id, { isVerified: true });
      res.json200(user, "Verified!");
    } else {
      res.json404();
    }
  }

  changePasswordCb = async (req, res) => {
    const { id, email } = req.params;
    const user = await this.service.readById(id);
    if (user) {
      await resetPassword(user._id, user.email, user.name); 
      res.json200(user, "Se envió un correo de verificación");
    } else {
      res.json404("NO existe el usuario con el Id indicado");
    }
  }

  newPasswordCb = async (req, res) => {
    const { id, email, passwordAct, passwordNew1, passwordNew2 } = req.body;
    if (passwordNew1 !== passwordNew2) {
      res.json404("NO coinciden los dos valores de la nueva contraseña");
    }

    const user = await this.service.readById(id);
    if (!user) {
      res.json401("Invalid credentials");
    }

    const validar = compareHash(passwordAct, user.password);
    if (!validar) {
      res.json401("Invalid credentials");
    }

    const newPass = await this.service.updateById(id, { password: createHash(passwordNew1) });
    if (newPass) {
      res.json200(newPass, "Se ha cambiado correctamente el password");
    } else {
      res.json401("NO fue posible modificar la constraseña del usuario");
    }
  }


  badAuthCb = (req, res, next) => res.json401();

  forbiddenCb = (req, res, next) => res.json403();
}

const authController = new AuthController();
export { authController };
