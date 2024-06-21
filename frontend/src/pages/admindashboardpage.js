// src/pages/admindashboardpage.js (ensure lowercase file name)
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed (`npm install axios`)

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    // Fetch products from an API or a mock data source
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.example.com/products'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      // Implement logic to delete product by ID
      await axios.delete(`https://api.example.com/products/${productId}`); // Replace with your API endpoint
      // After deletion, update the products list
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Implement logic to add new product
      const newProduct = { name: productName, price: productPrice };
      await axios.post('https://api.example.com/products', newProduct); // Replace with your API endpoint for POST request
      // After adding, fetch updated product list
      const response = await axios.get('https://api.example.com/products'); // Replace with your API endpoint
      setProducts(response.data);
      // Clear form fields
      setProductName('');
      setProductPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Products List</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="number" placeholder="Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
