import classnames from "classnames";
import React from "react";

import "./ProductList.scss";
import { Quantity } from "./Quantity";
import { Product as ProductType } from "./types";

type Props = ProductType & {
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
};

export const Product: React.FC<Props> = (props) => {
  const { quantity, onQuantityChange, id, description, price, name } = props;

  return (
    <div
      onClick={() => onQuantityChange(id, quantity === 0 ? 1 : 0)}
      className={classnames(
        "product",
        quantity >= 1 && "product--with-quantity"
      )}
    >
      <div className="right-section">
        <div className="product-name">{name}</div>
        <div className="product-description">{description}</div>
        <div className="bottom-section">
          <div className="product-price">${price.toFixed(2)}</div>
        </div>
      </div>
      <div className="left-section">
        <img className="product-image" src={props.imageUrl} />
      </div>
      <div className="bottom-right-corner">
        <Quantity
          id={id}
          quantity={quantity}
          onQuantityChange={(q) => onQuantityChange(id, q)}
        />
      </div>
    </div>
  );
};
