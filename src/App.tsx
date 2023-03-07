import React, { useEffect, useState } from "react";
import ProductList from "./components/product-list/ProductList";
import { fetchProducts } from "./fetch/fetchProducts";
import "./App.css";
import type { Product } from "./components/product-list/types";
import { CheckoutButton } from "./components/checkout-button/CheckoutButton";
import { composeCheckoutUrl } from "./utils/compose-checkout-url";
import { RingLoader } from "react-spinners";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
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
      {!products.length && (
        <div className="loader">
          <RingLoader color="blue" />
        </div>
      )}
      {products.length ? (
        <>
          <ProductList
            products={products}
            onQuantityChanges={(config) => {
              if (Object.values(config).some((el) => el)) {
                setBtnDisabled(false);
              } else {
                setBtnDisabled(true);
              }
              setCheckoutUrl(composeCheckoutUrl(config));
            }}
          ></ProductList>
          {!btnDisabled && (
            <div className="checkout-button-wrapper">
              <CheckoutButton onClick={onCheckout} disabled={btnDisabled} />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default App;
