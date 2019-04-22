import LineItem from "./LineItem";

export default function CartSidebar({ cartOpen, setCartOpen, cartItems, incrementQuantity, decrementQuantity }) {
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
    </div>
  );
}
