const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    image: {
      type: String,
      required: [true, "Product must have a image"],
    },
  },
  { timestamps: true },
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
