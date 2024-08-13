require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn"); // Ensure this file connects to MongoDB properly
const Products = require("./models/productSchema"); // Ensure this schema is defined
const router = require('./routes/router'); // Import the router
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Use the routes defined in router.js
app.use('/api', router);

// Product-related endpoints
app.post('/products/add', async (req, res) => {
    try {
        const productDetail = req.body;
        console.log("Received product details:", productDetail);

        const newProduct = await Products.create(productDetail);
        console.log("Product created successfully:", newProduct);

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
});

// add product
app.post('/products/add', async (req, res) => {
    try {
        const productDetail = req.body;
        console.log("Received product details:", productDetail);

        // Validate productDetail if needed (e.g., check required fields)
        // e.g., if (!productDetail.name || !productDetail.details) throw new Error('Missing required fields');

        // Create the product
        const newProduct = await Products.create(productDetail);
        console.log("Product created successfully:", newProduct);

        // Respond with the created product
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);

        // Respond with an error message
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
});

// Display all products
app.get('/products/get', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
});

// Display product by ID
app.get('/products/get/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product detail:", error.message);
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
});

// Update product by ID
app.put('/products/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(500).json({ message: "Failed to update product", error: error.message });
    }
  });
  
  // Delete product by ID
app.delete('/products/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server started at Port No: ${PORT}`);
});