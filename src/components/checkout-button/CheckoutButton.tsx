import boltLogo from "./bolt_logo_lightning.svg";
import "./checkoutButton.scss"

export const CheckoutButton = () => {
  return (
    <button className="checkout-button">
      <img src={boltLogo} alt="Checkout"/>
      Checkout
    </button>
  )
}