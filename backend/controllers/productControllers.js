const Product = require('../models/productSchema');
const multer = require('multer');
const path = require('path');

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.addProduct = [
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
  ]), // Adjust the maxCount as needed
  async (req, res) => {
    const { name, originalPrice, salePrice, size, colors, details, info, type } = req.body;
    const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].path : null;
    const additionalImages = req.files['additionalImages'] ? req.files['additionalImages'].map(file => file.path) : [];

    if (!name || !originalPrice || !salePrice) {
      return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    try {
      const product = new Product({
        name,
        originalPrice,
        salePrice,
        size: size ? size.split(',') : [], // Ensure size is handled correctly
        colors: colors ? colors.split(',') : [], // Ensure colors is handled correctly
        details,
        info,
        type,
        mainImage,
        additionalImages
      });

      const savedProduct = await product.save();
      return res.status(200).json(savedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      return res.status(500).json({ error: 'Failed to add product.' });
    }
  }
];
