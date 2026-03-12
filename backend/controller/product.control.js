const catchAsync = require("../utilies/catchAsync");
const AppError = require("../utilies/appError");
const Product = require("../models/product.model.js");
const mongoose = require("mongoose");

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log("asdsa");
  console.log(req.body);
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    console.log("asdsa");
    return next(new AppError("please fill all fields", 404));
  }

  const newProduct = await Product.create({ name, price, image });
  res.status(201).json({
    status: "success",
    data: {
      data: newProduct,
    },
  });
});
exports.deleteProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const delDoc = await Product.findByIdAndDelete(id);
  if (!delDoc) {
    return next(new AppError(`no product founded with this ${id}`, 404));
  }
  res.json({ success: true, message: "Product deleted successfully" });
});
exports.getAllproduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      data: products,
    },
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError(`invalid productId : ${id}`, 404));
  }

  const newProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!newProduct) {
    return next(new AppError(`no product founded with this ${id}`, 500));
  }

  res.status(201).json({
    status: "success",
    data: {
      data: newProduct,
    },
  });
});
