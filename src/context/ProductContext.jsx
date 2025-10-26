import React, { createContext, useState, useEffect } from 'react';
import useRetrieveData from '../hooks/useRetrieveData';
import useEditData from '../hooks/useEditData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { data, loading, error } = useRetrieveData("http://localhost:5000/products");
    const { updateData } = useEditData();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrigins, setSelectedOrigins] = useState([]);

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    const origins = [...new Set(products.map(p => p.origin))];

    const handleOriginChange = (origin) => {
        if (selectedOrigins.includes(origin)) {
            setSelectedOrigins(prev => prev.filter(o => o !== origin));
        } else {
            setSelectedOrigins(prev => [...prev, origin]);
        }
    };

    const handleSearchChange = (searchValue) => {
        setSearch(searchValue);
    };

    const filteredByOrigin = products.filter(p => {
        if (selectedOrigins.length === 0) {
            return true;
        }
        return selectedOrigins.includes(p.origin);
    });

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

    const value = {
        products,
        search,
        selectedOrigins,
        loading,
        error,
        
        origins,
        filteredByOrigin,
        searchedProducts,
        
        handleOriginChange,
        handleSearchChange,
        setSearch,
        updateProduct,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext };