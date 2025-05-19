import { Schema, Types, model } from "mongoose";

const collection = "products";
const schema = new Schema({
  // name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true, enum: ["JAZZ", "POP", "ROCK", "ROCK EN ESPAÑOL"] },
  language: { type: String, required: true, enum: ["INGLES", "ESPAÑOL"] },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true, default: 0 },
  type: { type: String, required: true, enum: ["CD", "VINILO", "CASSETTE"] },
  thumbnails: { type: Array },
},
{
  timestamps: true,
});

// schema.pre(/^find/, function () {
//   this.populate("owner_id", "email avatar");
// });

const Product = model(collection, schema);
export default Product;
