import React, { useState } from 'react';
import { addProduct } from '../api/productApi';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      colors: colors.split(',').map(color => color.trim()),
      sizes: sizes.split(',').map(size => size.trim()),
      image
    };

    try {
      await addProduct(newProduct);
      alert('Product added successfully');
      // Reset form fields
      setName('');
      setDescription('');
      setPrice('');
      setColors('');
      setSizes('');
      setImage('');
    } catch (error) {
      console.error('Failed to add product', error);
      alert(`Failed to add product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Colors (comma separated):</label>
        <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} />
      </div>
      <div>
        <label>Sizes (comma separated):</label>
        <input type="text" value={sizes} onChange={(e) => setSizes(e.target.value)} />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
