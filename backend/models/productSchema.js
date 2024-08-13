// backend/models/productSchema.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  originalPrice: Number,
  salePrice: Number,
  size: [String],
  colors: [String],  // Ensure this is defined as an array of strings
  details: String,
  info: String,
  type: String,
  mainImage: String,
  additionalImages: [String],
  paymentLink: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
