import { useCartContext } from "../context/CartContext";

export default function Cart({ children }: { children: JSX.Element | JSX.Element[] }) {
  const cart = useCartContext();
  const cnt = cart.cartItems?.reduce((a, b) => a + b.quantity, 0) || 0;

  return (
    <div style={{ position: "relative" }}>
      {cnt ? <div className="badge">{cnt}</div> : null}
      <div id="cart-icon">
        {children}
        <div id="cart-template" style={{ display: "none" }}>
          <p>Cart ({cnt})</p>
          <ul className="list tl pa0">
            {cart.cartItems &&
              cart.cartItems.map((item, index) => (
                <li key={`item-${index}`}>
                  <img src={item.url} className="w3" />
                  <span onClick={ev => cart.removeFromCart(index)}>
                    <i className="material-icons hover-gray pointer">close</i>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
