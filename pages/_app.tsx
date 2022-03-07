import React from "react";
import Head from "next/head";
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from "../context/CartContext";

import "material-icons/iconfont/material-icons.css";
import "../styles/global.css";

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
