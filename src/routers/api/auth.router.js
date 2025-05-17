import { Router } from "express";
import { userManager } from "../../data/manager.mongo.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Registered";
    // validar datos obligatorios
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Invalid data");
      error.statusCode = 400;
      throw error;
    }
    // validar si el usuario ya fue registrado
    let user = await userManager.readBy({ email });
    if (user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    // hacer el registro del usuario (crearlo)
    // proteger la constraseña
    user = await userManager.createOne(req.body);
    // enviar respuesta al cliente
    const data = { method, url, message, user };
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Logged In";
    // validar datos obligatorios
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Invalid data");
      error.statusCode = 400;
      throw error;
    }
    // validar si el usuario ya fue registrado
    let user = await userManager.readBy({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    // validar si la constraseña es correcta
    if (user.password !== password) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    // configurar la cookie
    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    };
    // enviar respuesta al cliente
    const data = { method, url, message, user };
    res
      .status(201)
      .cookie("user_id", user._id, opts)
      .cookie("role", user.role, opts)
      .cookie("email", user.email, opts)
      .json(data);
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
    res
      .status(200)
      .clearCookie("user_id")
      .clearCookie("role")
      .clearCookie("email")
      .json(data);
  } catch (error) {
    next(error);
  }
};

const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "User Online";
    // validar el usuario que está asociado con las cookies
    const { user_id, email, role } = req.signedCookies;
    let user = await userManager.readById(user_id);
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const data = { method, url, message, user };
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", registerCb);
authRouter.post("/login", loginCb);
authRouter.post("/signout", signoutCb);
authRouter.get("/online", onlineCb);

export { authRouter };
