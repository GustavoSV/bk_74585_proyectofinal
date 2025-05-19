import { Router } from "express";
import { productsManager } from "../data/manager.mongo.js";

const viewsRouter = Router();

const homeViewCb = async (req, res) => {
  try {
    const products = await productsManager.readAll();
    res.render("index.handlebars", { title: "Bienvenido", products })
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const loginViewCb = (req, res) => {
  try {
    res.render("login.handlebars", { title: "Login"})
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const profileViewCb = (req, res) => {
  try {
    res.render("profile.handlebars", { title: "Profile"})
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const registerViewCb = (req, res) => {
  try {
    res.render("register.handlebars", { title: "Register"})
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const productViewCb = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsManager.readById(id);
    product.isAvailable = product.stock > 0;
    res.render("productDetail.handlebars", { title: "Product Detail", product})
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

viewsRouter.get("/", homeViewCb);
viewsRouter.get("/login", loginViewCb);
viewsRouter.get("/profile", profileViewCb);
viewsRouter.get("/register", registerViewCb);
viewsRouter.get("/product/:id", productViewCb);

export { viewsRouter };
