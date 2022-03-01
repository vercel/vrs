import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import NProgress from "nprogress";
import { useSession, signOut } from "next-auth/react";

import Cart from "./Cart";
const CartSidebar = dynamic(() => import("./CartSidebar"));

import NProgressStyles from "nprogress/nprogress.css";

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
  const { data: session, status } = useSession()
  const [router, setRouter] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    Router.router && setRouter(Router.router.pathname);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.user.name);
      setAvatarURL(session.user.image);
    }
  }, [status])

  function logout() {
    signOut();
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
                className={`link dim white dib mr3 v-mid ${router === "/store" ? "bb" : ""
                  }`}
                title="Store"
              >
                Store
              </a>
            </Link>
            <Link href="/about">
              <a
                className={`link dim white dib mr3 v-mid ${router === "/about" ? "bb" : ""
                  }`}
                title="About"
              >
                About
              </a>
            </Link>
            <a
              className="link dim white dib mr3 v-mid"
              href="https://github.com/vercel/vrs"
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
              <Image
                className="link dim white dib v-mid"
                onClick={logout}
                height="30px"
                width="30px"
                src={avatarURL}
                style={{ height: "20px", borderRadius: 100 }}
              />
            ) : (
              <Link href="/login">
                <a
                  className={`link dim white dib v-mid ${router === "/login" ? "bb" : ""
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
      {cartState.cartOpen && <CartSidebar
        cartOpen={cartState.cartOpen}
        toggleCartOpen={toggleCartOpen}
        cartItems={cartState && cartState.cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />}
    </div>
  );
}
