import React from "react";
import Head from "next/head";
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from "../context/CartContext";

import "../styles/global.css";
import "../styles/editor.css";
import "../styles/cart.css";
import "../styles/layout.css";
import "../styles/slider.css";
import "../styles/view.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </>
  )
}
