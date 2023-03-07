import React, { useEffect, useState } from "react";
import ProductList from "./components/product-list/ProductList";
import { fetchProducts } from "./fetch/fetchProducts";
import "./App.css";
import type { Product } from "./components/product-list/types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then((prods) => {
      setProducts(prods);
    });
  }, []);
  return (
    <div className="app">
      <h1>Little Italy Pizza</h1>
      <ProductList products={products}></ProductList>
    </div>
  );
}

export default App;
