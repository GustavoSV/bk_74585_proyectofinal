import { Router } from "express";
import { apiRouter } from "./api.router.js";
import { viewsRouter } from "./views.router.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

export { router };
