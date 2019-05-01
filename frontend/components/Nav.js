import { useState, useEffect } from "react";

import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import NProgressStyles from "nprogress/nprogress.css";

import Cart from "./Cart";
import CartSidebar from "./CartSidebar";
import CartStyles from "../styles/cart.css";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function Nav({
  toggleCartOpen,
  clearCart,
  cartState,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
}) {
  const [router, setRouter] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    Router.router && setRouter(Router.router.pathname);
    if (Cookies.get("user-from-github")) {
      const { username, avatar } = JSON.parse(
        decodeURIComponent(Cookies.get("user-from-github"))
      );
      setUsername(username);
      setAvatarURL(avatar);
    }
  }, []);

  function logout() {
    Cookies.remove("user-from-github");
    setUsername(null);
    setAvatarURL(null);
    clearCart();
    Router.push("/");
  }

  return (
    <div className={`fixed w-100 ph3 pv3 pv3-ns ph3-m ph4-l fixed z-9999`}>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              CartStyles +
              NProgressStyles +
              "#nprogress .peg { display: none } #nprogress .bar { background: white; height: 3px; z-index: 10000; }"
          }}
        />
      </Head>

      <header>
        <nav className="f6 fw6 ttu tracked dt-l w-100 mw8 center">
          <div className="w-100 w-10-l dtc-l tc tl-l v-mid">
            <Link href="/">
              <a className="link dim white dib mr3" title="Home">
                V R S
              </a>
            </Link>
          </div>
          <div className="w-100 w-90-l dtc-l tc tr-l v-mid">
            <Link href="/store">
              <a
                className={`link dim white dib mr3 v-mid ${
                  router === "/store" ? "bb" : ""
                }`}
                title="Store"
              >
                Store
              </a>
            </Link>
            <Link href="/about">
              <a
                className={`link dim white dib mr3 v-mid ${
                  router === "/about" ? "bb" : ""
                }`}
                title="About"
              >
                About
              </a>
            </Link>
            <a
              className="link dim white dib mr3 v-mid"
              href="https://github.com/zeit/vrs"
              target="_blank"
              title="GitHub"
            >
              GitHub
            </a>
            <a
              className="link dim white dib mr3 v-mid"
              href="#"
              onClick={e => {
                e.preventDefault();
                console.log("opening cart...");
                toggleCartOpen(true);
              }}
              title="Open Cart"
            >
              <Cart
                cnt={cartState && cartState.cartItems.length}
                items={cartState && cartState.cartItems}
              >
                <i className="material-icons md-18">shopping_cart</i>
              </Cart>
            </a>
            {avatarURL ? (
              <img
                className="link dim white dib v-mid"
                onClick={logout}
                src={avatarURL}
                style={{ height: "20px", borderRadius: 100 }}
              />
            ) : (
              <Link href="/login">
                <a
                  className={`link dim white dib v-mid ${
                    router === "/login" ? "bb" : ""
                  }`}
                  title="Login"
                >
                  <i className="material-icons md-18">person</i>
                </a>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <CartSidebar
        cartOpen={cartState.cartOpen}
        toggleCartOpen={toggleCartOpen}
        cartItems={cartState && cartState.cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}
