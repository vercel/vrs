import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import LineItem from "./LineItem";
import CheckoutForm from "./CheckoutForm";
import { useCartContext } from '../context/CartContext';

export default function CartSidebar() {
  const {
    setCartVisibility,
    cartItems,
    visible
  } = useCartContext();

  const TAX_RATE = 0.08;
  const subtotalPrice = cartItems?.reduce((a, b) => a + b.quantity * b.price, 0) || 0;
  const totalTax = subtotalPrice * TAX_RATE;
  const totalPrice = subtotalPrice + totalTax;

  return (
    <div className={`Cart ${visible ? "Cart--open" : "dn"}`}>
      <header className="Cart__header">
        <h2>cart</h2>
        <button
          className="Cart__close"
          onClick={e => {
            e.preventDefault();
            setCartVisibility(false);
          }}
        >
          close
        </button>
      </header>
      <ul className="Cart__line-items">
        {cartItems &&
          cartItems.map(item => (
            <LineItem
              key={item.id}
              product={item}
            />
          ))}
      </ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {subtotalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Taxes</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {totalTax.toFixed(2)}</span>
          </div>
        </div>
        <div className="Cart-info clearfix total">
          <div className="Cart-info__total Cart-info__small">Total</div>
          <div className="Cart-info__pricing">
            <span className="pricing">$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Elements stripe={loadStripe(process.env.STRIPE_PK)}>
          <CheckoutForm totalPrice={totalPrice} />
        </Elements>
      </footer>
    </div>
  );
}


