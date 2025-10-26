
import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function EditForm({ product, setEditToggle }) {
    const { updateProduct } = useContext(ProductContext);
    
    const [formData, setFormData] = useState({
        name: product.name,
        origin: product.origin,
        price: product.price,
        description: product.description
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product.id, formData)
            .then(() => {
                setEditToggle(false); // Close the edit form after successful update
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                alert("Error updating product. Please try again.");
            });
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="origin">Origin:</label>
                <input 
                    type="text" 
                    id="origin"
                    name="origin" 
                    value={formData.origin}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input 
                    type="number" 
                    id="price"
                    name="price" 
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                />
            </div>
            
            <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditToggle(false)}>Cancel</button>
            </div>
        </form>
    );
}

export default EditForm;
