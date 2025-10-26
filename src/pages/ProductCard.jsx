import React, { useState } from "react";
import EditForm from "./EditForm";

function ProductCard({ product }) {
    const [editToggle, setEditToggle] = useState(false);

    const handleEditToggle = () => {
        setEditToggle(prev => !prev);
    };

    return (
        <div className="product-card">
            {editToggle ? (
                <EditForm 
                    product={product} 
                    setEditToggle={setEditToggle} 
                />
            ) : (
                <>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-origin">Origin: {product.origin}</p>
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.description}</p>
                </>
            )}
            <button className="edit-button" onClick={handleEditToggle}>Edit</button>
        </div>
    );
}

export default ProductCard;