import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import ProductContainer from "./pages/ProductContainer";
import ProductList from "./pages/ProductList";
import ProductCard from "./pages/ProductCard";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductContainer />}>
            <Route path="" element={<ProductList />} />
            <Route path=":id" element={<ProductCard />} />
            <Route path="new" element={<ProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;