/**
 * Created by shu on 7/5/2017.
 * Refactored by coetry on 3/25/2019.
 */

import { useState, useEffect } from "react";

import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import NProgressStyles from "nprogress/nprogress.css";

import Cart from "./Cart";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function Nav() {
  const [router, setRouter] = useState("");
  const [username, setUsername] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    Router.router && setRouter(Router.router.pathname);
    if (Cookies.get("user-from-github")) {
      const { username, avatar } = JSON.parse(Cookies.get("user-from-github"));
      setUsername(username);
      setAvatarURL(avatar);
    }
  }, []);

  return (
    <header className={`fixed w-100 ph3 pv3 pv3-ns ph3-m ph4-l fixed z-9999`}>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html:
              NProgressStyles +
              "#nprogress .peg { display: none } #nprogress .bar { background: white; height: 3px; z-index: 10000; }"
          }}
        />
      </Head>
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
          <a className="link dim white dib mr3 v-mid" href="#" title="Contact">
            <Cart>
              <i className="material-icons md-18">shopping_cart</i>
            </Cart>
          </a>
          <Link href={avatarURL ? "/auth/logout" : "/login"}>
            <a
              className={`link dim white dib v-mid ${
                router === "/login" ? "bb" : ""
              }`}
              title="Login"
            >
              {avatarURL ? (
                <img
                  src={avatarURL}
                  style={{ height: "30px", borderRadius: 100 }}
                />
              ) : (
                <i className="material-icons md-18">person</i>
              )}
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
