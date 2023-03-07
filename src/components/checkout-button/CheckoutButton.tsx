import { ReactComponent as BoltLogo } from "./bolt_logo_lightning.svg";
import "./checkoutButton.scss"

export const CheckoutButton = () => {
  return (
    <button className="checkout-button">
      <BoltLogo/>
      Checkout
    </button>
  )
}