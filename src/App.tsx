import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from "./components/product-list/ProductList";
import fakeProducts from "./utils/fake-product";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ProductList products={fakeProducts}></ProductList>
      </header>
    </div>
  );
}

export default App;
