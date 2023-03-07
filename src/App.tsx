import React, {useEffect} from 'react';
import ProductList from "./components/product-list/ProductList";
import fakeProducts from "./utils/fake-product";
import {fetchProducts} from "./fetch/fetchProducts";
import "./App.css";

function App() {
  useEffect(() => {
    fetchProducts().then(res => console.log(res));
  }, [])
  return (
    <div className="app">
      <h1>Little Italy Pizza</h1>
      <ProductList products={fakeProducts}></ProductList>
    </div>
  );
}

export default App;
