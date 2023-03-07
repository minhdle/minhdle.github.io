import React, { useEffect, useState } from "react";
import ProductList from "./components/product-list/ProductList";
import { fetchProducts } from "./fetch/fetchProducts";
import "./App.css";
import type { Product } from "./components/product-list/types";
import { CheckoutButton } from "./components/checkout-button/CheckoutButton";
import { composeCheckoutUrl } from "./utils/compose-checkout-url";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then((prods) => {
      setProducts(prods);
    });
  }, [setProducts]);

  const [checkoutUrl, setCheckoutUrl] = useState("");

  const onCheckout = () => {
    window.open(checkoutUrl, "_blank");
  };
  return (
    <div className="app">
      <h1 className="store-name">Little Italy Pizza</h1>
      <ProductList
        products={products}
        onQuantityChanges={(config) => {
          setCheckoutUrl(composeCheckoutUrl(config));
          console.log(composeCheckoutUrl(config));
        }}
      ></ProductList>
      <div className="checkout-button-wrapper">
        <CheckoutButton onClick={onCheckout} />
      </div>
    </div>
  );
}

export default App;
