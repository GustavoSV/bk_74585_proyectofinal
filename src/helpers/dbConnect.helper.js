import { connect } from "mongoose";

const dbConnect = async (url) => {
  try {
    await connect(url);
    console.log("Conectado a la base de datos mongo");
  } catch (error) {
    console.error(error);
  }
};

export { dbConnect };
