import React, { useState } from 'react';
import './style/addproduct.scss';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', size: [], colors: [], details: '' });

  const handleAddProduct = async () => {
    // Add product logic
  };

  const handleAddColor = () => {
    setNewProduct(prev => ({
      ...prev,
      colors: [...prev.colors, '']
    }));
  };

  const handleRemoveColor = (index) => {
    setNewProduct(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleColorChange = (index, value) => {
    setNewProduct(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => i === index ? value : color)
    }));
  };

  return (
    <section className="add-product">
      <div className="card">
        <h2>Add Product</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Details"
            value={newProduct.details}
            onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
          />
        </div>
        <div className="sizes">
          <h3>Sizes</h3>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <label key={size}>
              <input
                type="checkbox"
                checked={newProduct.size.includes(size)}
                onChange={(e) => {
                  setNewProduct(prev => ({
                    ...prev,
                    size: e.target.checked
                      ? [...prev.size, size]
                      : prev.size.filter(s => s !== size)
                  }));
                }}
              />
              {size}
            </label>
          ))}
        </div>
        <div className="colors">
          <h3>Colors</h3>
          {newProduct.colors.map((color, index) => (
            <div key={index} className="color-input">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
              />
              <button onClick={() => handleRemoveColor(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddColor}>Add Color</button>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="₹ Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </section>
  );
};

export default AddProduct;
