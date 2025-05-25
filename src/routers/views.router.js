import { RouterHelper } from "../helpers/router.helper.js";
import { cartsManager, productsManager, usersManager } from "../data/manager.mongo.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.mid.js";
import { prepareCart } from "../helpers/dataCart.util.js";

const homeViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.render("index.handlebars", { title: "Bienvenido", user: req.user, products });
};

const loginViewCb = (req, res) => {
  res.render("login.handlebars", { title: "Login", user: req.user });
};

const signoutViewCb = async (req, res) => {
  const { token } = req.signedCookies;
  if (!token) {
    return res.json401("Invalid credentials. Don't exist token");
  }
  res.clearCookie("token");
  res.render("logout.handlebars");
};

const profileViewCb = async (req, res) => {
  const { id } = req.params;
  const profile = await usersManager.readById(id);
  
  res.render("profile.handlebars", { title: "Profile", user: req.user, profile });
};

const cartViewCb = async (req, res) => {
  const { id } = req.params;
  const itemsCart = await cartsManager.readAll({user_id: id});
  const { cartItems, totalPrice, totalQuantity, isCartEmpty } = await prepareCart(itemsCart);

    res.render("cart.handlebars", {
      title: "Tu Carrito",
      user: req.user,
      cartItems,
      totalPrice,
      totalQuantity,
      isCartEmpty
    });
};

const registerViewCb = (req, res) => {
  res.render("register.handlebars", { title: "Register", user: req.user });
};

const productViewCb = async (req, res) => {
  const { id } = req.params;
  const product = await productsManager.readById(id);
  product.isAvailable = product.stock > 0;
  res.render("productDetail.handlebars", { title: "Product Detail", user: req.user, product });
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.renderMeth("/login", ["PUBLIC"], isAuthenticated, loginViewCb);
    this.renderMeth("/signout", ["USER", "ADMIN"], isAuthenticated, signoutViewCb);
    this.renderMeth("/profile/:id", ["USER", "ADMIN"], isAuthenticated, profileViewCb);
    this.renderMeth("/cart/:id", ["USER", "ADMIN"], isAuthenticated, cartViewCb);
    this.renderMeth("/register", ["PUBLIC"], isAuthenticated, registerViewCb);
    this.renderMeth("/product/:id", ["PUBLIC"], isAuthenticated, productViewCb);
    this.renderMeth("/", ["PUBLIC"], isAuthenticated, homeViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export { viewsRouter };
