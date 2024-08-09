const Product = require('../models/productSchema');

exports.addProduct = async (req, res) => {
  const { name, originalPrice, salePrice, size, colors, details, info, type, mainImage, additionalImage1, additionalImage2 } = req.body;

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
      additionalImages: [additionalImage1, additionalImage2].filter(Boolean) // Filter out empty strings
    });

    const savedProduct = await product.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ error: 'Failed to add product.' });
  }
};
