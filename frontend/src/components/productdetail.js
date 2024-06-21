// frontend/src/components/productdetail.js

import React from 'react';

const ProductDetail = ({ product }) => {
    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>{product.details}</p>
            <p>Price: ${product.price}</p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
        </div>
    );
};

export default ProductDetail;
