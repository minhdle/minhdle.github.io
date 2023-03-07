import plus from "./icons/plus.svg";
import minus from "./icons/minus.svg";
import trash from "./icons/trash.svg";

import React, { useEffect, useRef, useState } from "react";
import "./ProductList.scss";
import classnames from "classnames";

type AddToCartInputProps = {
  id: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export const Quantity: React.FC<AddToCartInputProps> = (props) => {
  const { id, quantity, onQuantityChange } = props;
  const [value, setValue] = useState(quantity);
  const isInCart = quantity !== 0;
  const quantityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const quantityPlusButton = (
    <div
      className={classnames(
        "quantity-button",
        isInCart && "quantity-button--withQuantityPlus"
      )}
      onClick={() => onQuantityChange(quantity + 1)}
    >
      <img src={plus} />
    </div>
  );

  const updateQuantity = () => {
    onQuantityChange(value);
  };

  return quantity !== 0 ? (
    <>
      <div
        className={classnames(
          "quantity-button",
          isInCart && "quantity-button--withQuantityMinus"
        )}
        onClick={() => onQuantityChange(quantity - 1)}
      >
        <img src={quantity === 1 ? trash : minus} />
      </div>
      <input
        id={`quantity-${id}`}
        type="number"
        min="1"
        value={value === 0 ? 1 : value}
        ref={quantityInputRef}
        className="quantity-input"
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={() => updateQuantity()}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            quantityInputRef.current?.blur();
            updateQuantity();
          }
        }}
      />
      {quantityPlusButton}
    </>
  ) : (
    quantityPlusButton
  );
};
