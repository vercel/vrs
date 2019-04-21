import { useState, useEffect } from "react";
import Head from "next/head";

export default function Cart({ children, items }) {
  const cnt = items.reduce((a, b) => a + b.quantity, 0)
  console.log('CNT:', cnt)
  /*
  const [cnt, setCnt] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let localCart = loadFromLocalStorage("vrs:cart");
    console.log("before parse", localCart);

    if (localCart) {
      let { items: local_items } = localCart;

      if (local_items) {
        setCnt(local_items.length);
        setItems(local_items);
      }
    }

    window.addToCart = function(details) {
      console.log("adding to cart ...");
      saveCart(details);
    };
  }, []);

  function removeFromCart(index) {
    console.log(index);
    this.state.items.splice(index, 1);
    this.setState({
      cnt: this.state.cnt - 1
    });
    this.saveCart();
    tippy.update(popper);
  }

  function saveToLocalStorage(key, data) {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  function loadFromLocalStorage(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  }

  function saveCart(details) {
    setItems(prev => {
      saveToLocalStorage("vrs:cart", {
        items: [...prev, { ...details }]
      });
      return [...prev, { ...details }];
    });
    setCnt(prev => prev + 1);
    // TODO: save to server
  }
  */
  return (
    <div style={{ position: "relative" }}>
      {cnt ? <div className="badge">{cnt}</div> : null}
      <div id="cart-icon">
        {children}
        <div id="cart-template" style={{ display: "none" }}>
          <p>Cart ({cnt})</p>
          <ul className="list tl pa0">
            {items &&
              items.map((item, index) => (
                <li key={`item-${index}`}>
                  <img src={item.url} className="w3" />
                  <span onClick={ev => removeFromCart(index)}>
                    <i className="material-icons hover-gray pointer">close</i>
                  </span>
                </li>
              ))}
          </ul>
          {/*
	 
          <a className="white mb2" href="/checkout">
            checkout
          </a>
       */}
        </div>
      </div>
    </div>
  );
}
