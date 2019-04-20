export default function CartSidebar({ cartOpen, setCartOpen }) {
  return (
    <div className={`Cart ${cartOpen && "Cart--open"}`}>
      <div className="Cart__header">
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
      </div>
    </div>
  );
}
