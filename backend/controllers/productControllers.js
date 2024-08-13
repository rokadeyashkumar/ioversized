exports.addProduct = async (req, res) => {
  const { name, originalPrice, salePrice, size, colors, details, info, type, mainImage, additionalImages, paymentLink } = req.body;

  if (!name || !originalPrice || !salePrice) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  try {
    const product = new Product({
      name,
      originalPrice,
      salePrice,
      size,
      colors,
      details,
      info,
      type,
      mainImage,
      additionalImages: additionalImages || [],  // Handle additional images
      paymentLink  // Add paymentLink
    });

    const savedProduct = await product.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ error: 'Failed to add product.' });
  }
};

// Update existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, originalPrice, salePrice, size, colors, details, info, type, mainImage, additionalImages, paymentLink } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      originalPrice,
      salePrice,
      size,
      colors,
      details,
      info,
      type,
      mainImage,
      additionalImages: additionalImages || [],
      paymentLink  // Update paymentLink
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Failed to update product.' });
  }
};
