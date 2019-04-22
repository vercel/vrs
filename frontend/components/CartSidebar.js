import LineItem from "./LineItem";

export default function CartSidebar({ cartOpen, setCartOpen, cartItems, incrementQuantity, decrementQuantity }) {

  const TAX_RATE = 0.08
  const subtotalPrice = cartItems.reduce((a, b) => a + (b.quantity * b.price), 0)
  const totalTax = subtotalPrice * TAX_RATE
  const totalPrice = subtotalPrice + totalTax
  return (
    <div className={`Cart ${cartOpen && "Cart--open"}`}>
      <header className="Cart__header">
        <h2>cart</h2>
        <button
          className="Cart__close"
          onClick={e => {
            e.preventDefault();
            setCartOpen(false);
          }}
        >
          close
        </button>
      </header>
      <ul className="Cart__line-items">
        {cartItems &&
          cartItems.map(item => (
              <LineItem key={item.id} product={item} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
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
      <div className="Cart-info clearfix">
      <div className="Cart-info__total Cart-info__small">Total</div>
      <div className="Cart-info__pricing">
      <span className="pricing">$ {totalPrice.toFixed(2)}</span>
      </div>
      </div>
 
      </footer>
    </div>
  );
}
