import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useRetrieveData from "../hooks/useRetrieveData";

function ProductContainer() {
    const { data, loading, error } = useRetrieveData("http://localhost:5000/products");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    // Making the content dynamic based on loading/error states
    let content;
    if (loading) {
        content = <p>Loading products...</p>;
    } else if (error) {
        content = <p>Error loading products: {error}</p>;
    } else {
        content = <Outlet context={{ products }} />;
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