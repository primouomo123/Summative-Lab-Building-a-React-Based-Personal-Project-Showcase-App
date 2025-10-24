import React from "react";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-origin">Origin: {product.origin}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
        </div>
    );
}

export default ProductCard;