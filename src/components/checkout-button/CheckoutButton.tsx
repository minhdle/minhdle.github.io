import { ReactComponent as BoltLogo } from "./bolt_logo_lightning.svg";
import "./checkoutButton.scss";

export const CheckoutButton = ({ onClick, disabled }: { onClick: () => void, disabled: boolean }) => {
  return (
    <button className="checkout-button" onClick={onClick} disabled={disabled}>
      <BoltLogo />
      Checkout
    </button>
  );
};
