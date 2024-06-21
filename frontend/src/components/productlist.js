// frontend/src/components/productlist.js

import React from 'react';
import ProductCard from './productcard';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
