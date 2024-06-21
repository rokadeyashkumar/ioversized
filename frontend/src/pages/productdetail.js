// frontend/src/pages/productdetail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetail from '../components/productdetail';

const ProductDetailPage = ({ match }) => {
    const [product, setProduct] = useState(null);
    const productId = match.params.id;

    useEffect(() => {
        // Fetch product details from backend API
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <div className="product-detail-page">
            {product ? <ProductDetail product={product} /> : <p>Loading...</p>}
        </div>
    );
};

export default ProductDetailPage;
