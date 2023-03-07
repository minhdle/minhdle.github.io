import { useState } from "react";
import { Product } from "./Product";
import type { Product as ProductType } from "./types";

import "./ProductList.scss";

const ProductList = ({ products }: { products: ProductType[] }) => {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          {...product}
          key={product.id}
          onQuantityChange={handleQuantityChange}
          quantity={quantities[product.id] ?? 0}
        />
      ))}
    </div>
  );
};

export default ProductList;
