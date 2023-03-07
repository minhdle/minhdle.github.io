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

  const handleQuantityChange = (
    e: React.MouseEvent<HTMLDivElement>,
    quantity: number
  ) => {
    e.stopPropagation();
    onQuantityChange(quantity);
  };

  const quantityPlusButton = (
    <div
      className={classnames(
        "quantity-button",
        isInCart && "quantity-button--withQuantityPlus"
      )}
      onClick={(e) => handleQuantityChange(e, quantity + 1)}
    >
      <img src={plus} alt="increase quantity" />
    </div>
  );

  const updateQuantity = () => {
    onQuantityChange(value);
  };

  return (
    <>
      <div
        className={classnames(
          "quantity-button",
          isInCart && "quantity-button--withQuantityMinus",
          quantity === 0 && "hidden"
        )}
        onClick={(e) => handleQuantityChange(e, quantity - 1)}
      >
        <img src={quantity <= 1 ? trash : minus} alt="decrease quantity" />
      </div>
      <input
        id={`quantity-${id}`}
        type="number"
        min="1"
        value={value === 0 ? 1 : value}
        ref={quantityInputRef}
        className={classnames("quantity-input", quantity === 0 && "hidden")}
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
      <div
        className={classnames(
          "quantity-button",
          isInCart && "quantity-button--withQuantityPlus"
        )}
        onClick={(e) => handleQuantityChange(e, quantity + 1)}
      >
        <img src={plus} />
      </div>
    </>
  );
};
