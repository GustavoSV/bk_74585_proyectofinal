import crypto from "crypto"

const { PERSISTENCE } = process.env

class CartsDTO {
  constructor(action, data) {
    if (PERSISTENCE !== "mongo") {
      if (action = "INSERT") {
        this._id = crypto.randomBytes(12).toString("hex")
        this.createAt = new Date();
        this.updateAt = new Date();
      } else if (action = "UPDATE") {
        this.updateAt = new Date();
      }
    }
    this.product_id = data.product_id;
    this.user_id = data.user_id;
    this.quantity = data.quantity || 1;
    this.state = data.state;
  }
}

export { CartsDTO };