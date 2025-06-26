import crypto from "crypto"

const { PERSISTENCE } = process.env

class ProductsDTO {
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
    this.code = data.code;
    this.title = data.title;
    this.author = data.author;
    this.category = data.category;
    this.language = data.language
    this.price = data.price;
    this.status = data.status;
    this.stock = data.stock || 0;
    this.type = data.type;
    this.type = data.type;
    this.thumbnails = data.thumbnails;
  }
}

export { ProductsDTO };