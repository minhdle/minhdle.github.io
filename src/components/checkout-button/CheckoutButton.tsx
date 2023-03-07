import { ReactComponent as BoltLogo } from "./bolt_logo_lightning.svg";
import "./checkoutButton.scss";

export const CheckoutButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="checkout-button" onClick={onClick}>
      <BoltLogo />
      Checkout
    </button>
  );
};
