const express = require("express");
const productControler = require("../controller/product.control");

const reouter = express.Router();

reouter
  .get("/", productControler.getAllproduct)
  .post("/", productControler.createProduct)
  .patch("/:id", productControler.updateProduct)
  .delete("/:id", productControler.deleteProductById);

module.exports = reouter;
