export default function LineItem({ product, incrementQuantity, decrementQuantity, removeFromCart }) {

  const { id, name, price, url, quantity } = product
  return (
    <li className="Line-item">
      <div className="Line-item__img" style={{backgroundImage: `url(${url})`}} />
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <span className="Line-item__title">{name}</span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
      <button onClick={() => decrementQuantity(id)} className="Line-item__quantity-update">-</button>
      <span className="Line-item__quantity">{quantity}</span>
      <button onClick={() => incrementQuantity(id)} className="Line-item__quantity-update">+</button>
          </div>
      <span className="Line-item__price">$ {(price * quantity).toFixed(2)}</span>
      <button onClick={() => removeFromCart(id)}className="Line-item__remove">x</button>
        </div>
      </div>
    </li>
  );
}
