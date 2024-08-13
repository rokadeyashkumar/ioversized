import React, { useState, useEffect } from 'react';
import axios from './service/axios'; // Ensure the path is correct
import './style/productdetails.scss';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
  }, [selectedType]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get('/products/types'); // Ensure this endpoint provides product types
      setProductTypes(response.data);
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      await axios.put(`/products/update/${product._id}`, product);
      alert('Product updated successfully');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/delete/${productId}`);
      alert('Product deleted successfully');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleProductTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInputChange = (e, field, product) => {
    const value = e.target.value;
    setProducts(products.map(p => p._id === product._id ? { ...p, [field]: value } : p));
  };

  return (
    <section className="product-details">
      <div className="header">
        <h2>Product Details</h2>
        <div className="filter">
          <select onChange={handleProductTypeChange} value={selectedType}>
            <option value="All">All</option>
            {productTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Original Price</th>
                <th>Sale Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Details</th>
                <th>Info</th>
                <th>Payment Gateway Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(product => selectedType === 'All' || product.type === selectedType).map(product => (
                <tr key={product._id}>
                  <td>
                    <input 
                      type="text" 
                      value={product.name} 
                      onChange={(e) => handleInputChange(e, 'name', product)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={product.originalPrice} 
                      onChange={(e) => handleInputChange(e, 'originalPrice', product)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={product.salePrice} 
                      onChange={(e) => handleInputChange(e, 'salePrice', product)} 
                    />
                  </td>
                  <td>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <label key={size}>
                        <input
                          type="checkbox"
                          checked={product.size.includes(size)}
                          onChange={() => {
                            if (product.size.includes(size)) {
                              product.size = product.size.filter(s => s !== size);
                            } else {
                              product.size.push(size);
                            }
                            setProducts(products.map(p => p._id === product._id ? { ...p, size: product.size } : p));
                          }}
                        />
                        {size}
                      </label>
                    ))}
                  </td>
                  <td>
                    {product.colors.map(color => (
                      <span
                        key={color}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </td>
                  <td>
                    <textarea 
                      value={product.details} 
                      onChange={(e) => handleInputChange(e, 'details', product)} 
                    />
                  </td>
                  <td>
                    <textarea 
                      value={product.info} 
                      onChange={(e) => handleInputChange(e, 'info', product)} 
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      value={product.paymentLink || ''} 
                      onChange={(e) => handleInputChange(e, 'paymentLink', product)} 
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdateProduct(product)}>Update</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
