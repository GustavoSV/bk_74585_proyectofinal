import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Registered";
    const data = { method, url, message };
    console.log("authRouter.registerCb - req.user:", req.user);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Logged In";
    // configurar la cookie
    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    };
    // enviar respuesta al cliente
    const data = { method, url, message };
    const { user } = req;
    res.status(200).cookie("token", user.token, opts).json(data);
  } catch (error) {
    next(error);
  }
};

const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "User signout";
    // eliminar la cookie y enviar respueta al cliente
    const data = { method, url, message };
    res.status(200).clearCookie("token").json(data);
  } catch (error) {
    next(error);
  }
};

const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "User Online";
    // validar el usuario que está asociado con las cookies
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await usersManager.readById(dataToken?._id);
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const { password, __v, createdAt, updatedAt, ...rest } = user;
    const data = {
      method,
      url,
      message,
      user: rest,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const badAuthCb = (req, res, next) => {
  try {
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const optsBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" }; //
authRouter.post(
  "/register",
  passport.authenticate("register", optsBadAuth),
  registerCb
);
authRouter.post("/login", passport.authenticate("login", optsBadAuth), loginCb);
authRouter.post("/signout", signoutCb);
authRouter.get("/online", onlineCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/redirect",
  passport.authenticate("google", optsBadAuth),
  loginCb
);

export { authRouter };
