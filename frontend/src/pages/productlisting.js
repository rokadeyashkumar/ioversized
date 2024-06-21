// frontend/src/pages/productlisting.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/productlist';

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-listing-page">
            <h2>Our Products</h2>
            <ProductList products={products} />
        </div>
    );
};

export default ProductListingPage;
