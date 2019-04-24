import { useState, useEffect } from "react";
import Head from "next/head";

export default function Cart({ children, items, clearCart }) {
  const cnt = items.reduce((a, b) => a + b.quantity, 0);

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
