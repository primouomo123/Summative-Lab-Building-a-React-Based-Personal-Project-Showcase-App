import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useRetrieveData from "../hooks/useRetrieveData";

function ProductContainer() {
    const { data, loading, error } = useRetrieveData("http://localhost:5000/products");
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
    }

    const filteredByOrigin = products.filter(p => {
        // If no origins are selected, all products will be shown
        if (selectedOrigins.length === 0) {
            return true;
        }
        // Otherwise, only products matching selected origins are shown
        return selectedOrigins.includes(p.origin);
    });

    const searchedProducts = filteredByOrigin.filter(p => {
        // Apply search filter to already origin-filtered products
        return p.name.toLowerCase().includes(search.toLowerCase()) ||
               p.origin.toLowerCase().includes(search.toLowerCase()) ||
               p.description.toLowerCase().includes(search.toLowerCase()) ||
               p.price.toString().includes(search);
    });

    // Making the content dynamic based on loading/error states
    let content;
    if (loading) {
        content = <p>Loading products...</p>;
    } else if (error) {
        content = <p>Error loading products: {error}</p>;
    } else {
        content = <Outlet context={{ searchedProducts, search, setSearch,
            origins, selectedOrigins, handleOriginChange }} />;
    }

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                {content}
            </main>
        </>
    );
}

export default ProductContainer;