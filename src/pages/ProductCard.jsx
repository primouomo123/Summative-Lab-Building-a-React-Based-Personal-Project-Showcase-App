import React, { useState, useContext } from "react";
import EditForm from "./EditForm";
import { ProductContext } from "../context/ProductContext";

function ProductCard({ product }) {
    const [editToggle, setEditToggle] = useState(false);
    const { deleteProduct } = useContext(ProductContext);

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
                    <div className="button-container">
                        <button className="edit-button" onClick={handleEditToggle}>Edit</button>
                        <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductCard;