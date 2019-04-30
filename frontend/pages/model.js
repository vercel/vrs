import { useEffect } from "react";
import Layout from "../components/Layout";
import Editor from "../components/Editor";
import fetch from "isomorphic-unfetch";

function Model({
  details,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  cartState,
  toggleCartOpen
}) {
  return (
    <Layout
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      cartState={cartState}
      toggleCartOpen={toggleCartOpen}
    >
      <Editor details={details} addToCart={addToCart} />;
    </Layout>
  );
}

Model.getInitialProps = async function({ req, query }) {
  const { id } = query;
  let URL;

  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      URL = `https://${req.headers.host}/api/get-product?id=${id}`;
    } else {
      URL = `http://localhost:3000/api/get-product?id=${id}`;
    }
  } else {
    URL = `/api/get-product?id=${id}`;
  }

  const props = {
    details: {
      id: "1",
      name: "Charizard",
      description: "A friendly fire lizard Pokemon",
      price: 25
    }
  };

  try {
    const response = await fetch(URL);
    const { docs } = await response.json();
    props.details = docs[0];
  } catch (e) {
    console.error(e.message);
  }

  return props;
};

export default Model;
