import "dotenv/config.js";
import express from "express";
import { urlencoded, json } from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import __dirname from "./utils.js";
import { router } from "./src/routers/index.router.js";
import { errorHandler } from "./src/middlewares/errorHandler.mid.js";
import { pathHandler } from "./src/middlewares/pathHandler.mid.js";
import { dbConnect } from "./src/helpers/dbConnect.helper.js";

/* server settings */
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port", port);
  await dbConnect(process.env.URL_MONGO);
};
server.listen(port, ready);

// engine settings
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// middlewares settings
server.use(cookieParser(process.env.SECRET_KEY));
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(express.static("public"));
server.use(morgan("dev"));

// router settings
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
