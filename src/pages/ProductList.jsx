import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import Search from "../components/Search";
import { ProductContext } from "../context/ProductContext";

function ProductList() {
    const { searchedProducts, search, setSearch, origins, selectedOrigins, handleOriginChange } = useContext(ProductContext);

    console.log("searchedProducts:", searchedProducts);

    if (!searchedProducts) {
        return <p>No products available</p>;
    }

    return (
        <div className="layout-container" style={{ 
            margin: '0 calc(-50vw + 50%)', 
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw'
        }}>
            <aside>
                <h3>Search Products</h3>
                <Search search={search} setSearch={setSearch} origins={origins}
                onChange={handleOriginChange} selectedOrigins={selectedOrigins} />
            </aside>
            <main>
                <div className="products-container">
                    {searchedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductList;