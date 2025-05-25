import { RouterHelper } from "../helpers/router.helper.js";
import { apiRouter } from "./api.router.js";
import { viewsRouter } from "./views.router.js";

class IndexRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.useMeth("/api", apiRouter);
    this.useMeth("/", viewsRouter);
  };
}

const router = new IndexRouter().getRouter();
export { router };
