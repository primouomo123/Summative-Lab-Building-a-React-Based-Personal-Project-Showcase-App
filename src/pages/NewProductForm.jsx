import React, {useState, useEffect, useRef, useContext, useId} from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

function NewProductForm() {
    const { addProduct } = useContext(ProductContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        price: '',
        description: ''
    });

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const nameId = useId();
    const originId = useId();
    const priceId = useId();
    const descriptionId = useId();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(formData)
        navigate('/products');
    };

    return (
        <>
            <h2>Add New Product</h2>
            <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor={nameId}>Name:</label>
                <input
                    ref={inputRef}
                    type="text" 
                    id={nameId}
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor={originId}>Origin:</label>
                <input 
                    type="text" 
                    id={originId}
                    name="origin" 
                    value={formData.origin}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor={priceId}>Price:</label>
                <input 
                    type="number" 
                    id={priceId}
                    name="price" 
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor={descriptionId}>Description:</label>
                <textarea 
                    id={descriptionId}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                />
            </div>
            
            <div className="form-buttons">
                <button type="submit">Save</button>
            </div>
        </form>
        </>
    );
}

export default NewProductForm;