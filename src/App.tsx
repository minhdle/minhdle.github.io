import React, { useEffect, useState } from "react";
import ProductList from "./components/product-list/ProductList";
import { fetchProducts } from "./fetch/fetchProducts";
import "./App.css";
import type { Product } from "./components/product-list/types";
import { CheckoutButton } from "./components/checkout-button/CheckoutButton";

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
      <div className="checkout-button-wrapper">
        <CheckoutButton />
      </div>
    </div>
  );
}

export default App;
