const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  size: [String],
  colors: [String],
  details: String,
  info: String,
  type: {
    type: String,
    default: 'Classic Oversized T-Shirts'
  },
  mainImage: String,
  additionalImages: [String] // This will store additional images as an array
});

// creating model
const Products = mongoose.model('Products', productSchema);

module.exports = Products;
