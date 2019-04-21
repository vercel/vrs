export default function LineItem({ product }) {
  const { name, price, url } = product
  return (
    <li className="Line-item">
      <div className="Line-item__img" style={{backgroundImage: `url(${url})`}} />
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <span className="Line-item__title">{name}</span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button className="Line-item__quantity-update">-</button>
            <span className="Line-item__quantity">1</span>
            <button className="Line-item__quantity-update">+</button>
          </div>
          <span className="Line-item__price">${price}</span>
        </div>
      </div>
    </li>
  );
}
