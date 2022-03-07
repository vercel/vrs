import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useSession, signOut } from "next-auth/react";

import { useCartContext } from "../context/CartContext";
import Cart from "./Cart";
const CartSidebar = dynamic(() => import("./CartSidebar"));

import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function Nav() {
  const {
    setCartVisibility,
    clearCart,
    visible,
  } = useCartContext();
  const { data: session, status } = useSession()
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    })

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    })

    router.events.on("routeChangeError", () => {
      NProgress.done();
    })
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
    router.push("/");
  }

  return (
    <div className={`fixed w-100 ph3 pv3 pv3-ns ph3-m ph4-l fixed z-9999`}>
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
                className={`link dim white dib mr3 v-mid ${router.pathname === "/store" ? "bb" : ""
                  }`}
                title="Store"
              >
                Store
              </a>
            </Link>
            <Link href="/about">
              <a
                className={`link dim white dib mr3 v-mid ${router.pathname === "/about" ? "bb" : ""
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
                setCartVisibility(true);
              }}
              title="Open Cart"
            >
              <Cart>
                <i className="material-icons md-18">shopping_cart</i>
              </Cart>
            </a>
            {avatarURL ? (
              <div className="link dim white dib v-mid">
                <Image
                  onClick={logout}
                  height={20}
                  width={20}
                  src={avatarURL}
                />
              </div>
            ) : (
              <Link href="/login">
                <a
                  className={`link dim white dib v-mid ${router.pathname === "/login" ? "bb" : ""
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
      {visible && <CartSidebar />}
    </div>
  );
}
