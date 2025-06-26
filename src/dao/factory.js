import { dbConnect } from "../helpers/dbConnect.helper.js";
const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "fs":
    {
      console.log("Conectado a FS");
      
      const { usersManager, productsManager, cartsManager } = await import("./fs/dao.fs.js");
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
  case "memory":
    {
      console.log("Conectado a memory");
      
      const { usersManager, productsManager, cartsManager } = await import("./memory/dao.memory.js");
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
  default:
    {
      await dbConnect(process.env.URL_MONGO);
      const { usersManager, productsManager, cartsManager } = await import("./mongo/dao.mongo.js");
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
}

const { usersManager, productsManager, cartsManager } = dao;
export { usersManager, productsManager, cartsManager };
export default dao;