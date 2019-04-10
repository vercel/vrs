import { useState, useEffect } from "react";
import Head from "next/head";

import Tippy from "tippy.js";
import $ from "jquery";
import CartStyles from "tippy.js/dist/tippy.css";

export default function Cart({ children }) {
  const [cnt, setCnt] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      let el = $(".cart-tippy")[0];
      let tippy = Tippy(".cart-tippy", {
        html: "#cart-template",
        arrow: true,
        hideOnClick: false,
        theme: "dark"
      });
      let popper = tippy.getPopperElement(el);

      let localCart = loadFromLocalStorage("vrs:cart");
      console.log("before parse", localCart);

      if (localCart) {
        let { cnt: local_cnt, items: local_items } = localCart;

        if (local_cnt) {
          setCnt(local_cnt);
        }

        if (local_items) {
          setItems(local_items);
        }
      }

      /*
      setTimeout(() => {
        tippy.update(popper);
      }, 100);
      */

      // dirty
    },
    [cnt]
  );

  function removeFromCart(index) {
    console.log(index);
    this.state.items.splice(index, 1);
    this.setState({
      cnt: this.state.cnt - 1
    });
    this.saveCart();
    tippy.update(popper);
  }

  function addToCart(url) {
    console.log("adding to cart ...");
    let $screenshot = $(`<img src="${url}" class="screenshot"/>`);
    $screenshot.appendTo(".container .scroll-content > div");
    $screenshot.css({
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    });
    setTimeout(() => {
      let box = $("#cart-icon")[0].getBoundingClientRect();
      $screenshot.css({
        width: 30,
        height: 30,
        left: box.left,
        top: box.top + 20,
        opacity: 0
      });

      setCnt(cnt + 1);
      setItems([...items, { url }]);

      saveCart();

      tippy.update(popper);

      setTimeout(() => {
        $screenshot.remove();
      }, 1000);
    }, 300);
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

  function saveCart() {
    saveToLocalStorage("vrs:cart", { cnt, items });
    // TODO: save to server
  }

  return (
    <div style={{ position: "relative" }}>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CartStyles }} />
      </Head>
      {cnt ? <div className="badge">{cnt}</div> : null}
      <div
        id="cart-icon"
        className="cart-tippy"
        data-duration="300"
        data-animation="shift"
        data-trigger="click"
        data-position="bottom"
      >
        {children}
        <div id="cart-template" style={{ display: "none" }}>
          <p>Cart ({cnt})</p>
          <ul className="list tl pa0">
            {items.map((item, index) => (
              <li key={`item-${index}`}>
                <img src={item.url} className="w3" />
                <a onClick={ev => removeFromCart(index)}>
                  <i className="material-icons hover-gray pointer">close</i>
                </a>
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
