import React, { useState } from 'react';


export interface Product {
  quantity: number;
  price: number;
  id: string;
  description: string;
  name: string;
}
const ProductList = ({ products }: {products: Product[]}) => {
  const [quantities, setQuantities] = useState<{ [id: string]: number}>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
          <input
            id={`quantity-${product.id}`}
            type="number"
            min="1"
            value={quantities[product.id] || ''}
            onChange={e => handleQuantityChange(product.id, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
