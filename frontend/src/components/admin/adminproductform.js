// frontend/src/components/admin/adminproductform.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [error, setError] = useState('');

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        // Form validation
        if (!productName || !productDescription || !productPrice || productImages.length === 0 || sizes.length === 0 || colors.length === 0) {
            setError('Please fill out all fields.');
            return;
        }

        // Prepare product data to send to backend API
        const productData = {
            name: productName,
            description: productDescription,
            price: productPrice,
            images: productImages,
            sizes: sizes,
            colors: colors,
        };

        try {
            // Example POST request to add product
            const response = await axios.post('http://localhost:5000/api/products', productData);
            console.log('Product added:', response.data);
            // Clear form after successful submission
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductImages([]);
            setSizes([]);
            setColors([]);
            setError('');
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Failed to add product. Please try again later.');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const uploadedImages = files.map((file) => URL.createObjectURL(file));
        setProductImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    return (
        <div className="admin-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </div>
                <div>
                    <label>Images:</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                    {productImages.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index + 1}`} className="uploaded-image" />
                    ))}
                </div>
                <div>
                    <label>Sizes:</label>
                    <input type="text" value={sizes} onChange={(e) => setSizes(e.target.value.split(','))} />
                </div>
                <div>
                    <label>Colors:</label>
                    <input type="text" value={colors} onChange={(e) => setColors(e.target.value.split(','))} />
                </div>
                <button type="submit">Add Product</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AdminProductForm;
