import crypto from "crypto"
import { createHash } from "../helpers/hash.util.js"

const { PERSISTENCE } = process.env

class UsersDTO {
  constructor(action, data) {
    if (PERSISTENCE !== "mongo") {
      if (action = "INSERT") {
        this._id = crypto.randomBytes(12).toString("hex");
        this.createAt = new Date();
        this.updateAt = new Date();
      } else if (action = "UPDATE") {
        this.updateAt = new Date();
      }
    }
    this.name = data.name;
    this.city = data.city;
    this.email = data.email;
    this.password = createHash(data.password);
    this.avatar = data.avatar || "https://cdn-icons-png.flaticon.com/512/266/266033.png";
    this.role = data.role || "USER";
    this.isVerified = data.isVerified || false;
    this.verifyCode = data.verifyCode || crypto.randomBytes(6).toString("hex");
  }
}

export { UsersDTO };