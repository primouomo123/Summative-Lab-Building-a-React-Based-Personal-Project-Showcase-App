import React from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductList() {
    const { products } = useOutletContext();

    return (
        <div className="products-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;