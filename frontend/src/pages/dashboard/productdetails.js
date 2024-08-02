import React, { useState, useEffect } from 'react';
import './style/productdetails.scss';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Fetch products from the backend and set state
    // setProducts(response.data);
  };

  const handleUpdateProduct = async (productId) => {
    // Update product logic
    // After updating, refresh the product list
    // fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    // Delete product logic
    // After deleting, refresh the product list
    // fetchProducts();
  };

  return (
    <section className="product-details">
      <h2>Product Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Size</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.size.join(', ')}</td>
              <td>{product.colors.join(', ')}</td>
              <td>
                <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProductDetails;
