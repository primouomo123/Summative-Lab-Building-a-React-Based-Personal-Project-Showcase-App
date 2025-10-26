import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ProductContext } from "../context/ProductContext";

function ProductContainer() {
    const { loading, error } = useContext(ProductContext);

    // Making the content dynamic based on loading/error states
    let content;
    if (loading) {
        content = <p>Loading products...</p>;
    } else if (error) {
        content = <p>Error loading products: {error}</p>;
    } else {
        content = <Outlet />;
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