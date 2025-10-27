import React, { createContext, useState, useEffect } from 'react';
import useRetrieveData from '../hooks/useRetrieveData';
import useEditData from '../hooks/useEditData';

/* I created this file to manage product-related state and actions, so I don't have all this
code in ProductContainer.jsx */
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    // Custom hook to retrieve and edit data
    const { retrieveData, retrieveLoading, retrieveError } = useRetrieveData("http://localhost:5000/products");
    const { updateData } = useEditData(); // I only need updateData from this custom hook
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrigins, setSelectedOrigins] = useState([]);

    useEffect(() => {
        if (retrieveData) {
            setProducts(retrieveData);
        }
    }, [retrieveData]);

    /* This is to get unique product origins, so I can later create dynamic origin checkboxes
    in the Search.jsx component */
    const origins = [...new Set(products.map(p => p.origin))];

    // This is to handle origin checkbox changes
    const handleOriginChange = (origin) => {
        if (selectedOrigins.includes(origin)) {
            setSelectedOrigins(prev => prev.filter(o => o !== origin));
        } else {
            setSelectedOrigins(prev => [...prev, origin]);
        }
    };

    // This is to handle search input changes
    const handleSearchChange = (searchValue) => {
        setSearch(searchValue);
    };

    // First, I filter by origin
    const filteredByOrigin = products.filter(p => {
        if (selectedOrigins.length === 0) {
            return true;
        }
        return selectedOrigins.includes(p.origin);
    });

    // Then, I filter by search term
    const searchedProducts = filteredByOrigin.filter(p => {
        return p.name.toLowerCase().includes(search.toLowerCase()) ||
               p.origin.toLowerCase().includes(search.toLowerCase()) ||
               p.description.toLowerCase().includes(search.toLowerCase()) ||
               p.price.toString().includes(search);
    });

    const updateProduct = (id, updatedProduct) => {
        return updateData(`http://localhost:5000/products/${id}`, updatedProduct)
            .then(updatedData => {
                setProducts(prev => prev.map(product => 
                    product.id === id ? updatedData : product
                ));
                
                return updatedData;
            })
            .catch(error => {
                console.error("Error updating product:", error);
                throw error;
            });
    };

    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setProducts(prev => prev.filter(product => product.id !== id));
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            throw error;
        });
    };

    const addProduct = (newProduct) => {
        fetch(`http://localhost:5000/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(addedProduct => {
            setProducts(prev => [...prev, addedProduct]);
        })
        .catch(error => {
            console.error("Error adding product:", error);
            throw error;
        });
    };

    const value = {
        products,
        search,
        selectedOrigins,
        loading: retrieveLoading,
        error: retrieveError,
        
        origins,
        filteredByOrigin,
        searchedProducts,
        
        handleOriginChange,
        handleSearchChange,
        setSearch,
        updateProduct,
        deleteProduct,
        addProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext };