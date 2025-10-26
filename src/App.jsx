import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import ProductContainer from "./pages/ProductContainer";
import ProductList from "./pages/ProductList";
import NewProductForm from "./pages/NewProductForm";
import ErrorPage from "./pages/ErrorPage";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductContainer />}>
            <Route path="" element={<ProductList />} />
            <Route path="new" element={<NewProductForm />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;