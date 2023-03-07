import { useState } from "react";
import { Product } from "./Product";
import type { Product as ProductType } from "./types";

import "./ProductList.scss";

export interface QuantitiesConfig {
  [id: string]: number;
}

const ProductList = ({
  products,
  onQuantityChanges,
}: {
  products: ProductType[];
  onQuantityChanges: (config: QuantitiesConfig) => void;
}) => {
  const [quantities, setQuantities] = useState<QuantitiesConfig>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prevQuantities) => {
      const updated = {
        ...prevQuantities,
        [productId]: quantity,
      };
      onQuantityChanges(updated);
      return updated;
    });
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
