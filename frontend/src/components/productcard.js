// frontend/src/components/productcard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.details}</p>
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product.id}`} className="button">
                View Details
            </Link>
        </div>
    );
};

export default ProductCard;
