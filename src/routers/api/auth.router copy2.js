import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

const registerCb = async (req, res) => res.json201(null, "Registered");

const loginCb = async (req, res) => {
    const opts = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    };
    // enviar respuesta al cliente
    res.cookie("token", req.user.token, opts).json200(req.user);
};

const signoutCb = (req, res) => {
  const { token } = req.signedCookies;
  if (!token) {
    return res.json401("Invalid credentials. Don't exist token");
  }
  res.clearCookie("token").json200(null, "Signed out");
};

const onlineCb = async (req, res) => {
  const { token } = req.signedCookies;
  if (!token) {
    return res.json401("Invalid credentials. Don't exist token");
  }
  const dataToken = verifyToken(token);
  let user = await usersManager.readById(dataToken?._id);
  if (!user) {
    return res.json401("Invalid credentials");
  }
  const { password, __v, createdAt, updatedAt, ...rest } = user;
  res.json200(rest);
};

const badAuthCb = (req, res) => res.json401();

const optsBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" };

authRouter.post("/register", passport.authenticate("register", optsBadAuth), registerCb);
authRouter.post("/login", passport.authenticate("login", optsBadAuth), loginCb);
authRouter.get("/online", onlineCb);
authRouter.get("/signout", signoutCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get("/google/redirect", passport.authenticate("google", optsBadAuth), loginCb);
authRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

export { authRouter };
