/**
 * Created by shu on 10/5/2017.
 */

import { useEffect } from "react";
import Layout from "../components/Layout";
import Editor from "../components/Editor";

// 10, 11, 12, 18, 1, 2, 4, 5, 7

function Edit({ details, addToCart, cartState, incrementQuantity, decrementQuantity }) {
  useEffect(() => {
    console.log("EDIT PAGE:", cartState);
  });
  return (
      <Layout cartState={cartState} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}>
      <Editor details={details} addToCart={addToCart} />
    </Layout>
  );
}

Edit.getInitialProps = async function({ query }) {
  return {
    details: {
      id: query.id || "12",
      name: query.name || "Product",
      description: query.description || "Description",
      price: query.price || 99
    }
  };
};

export default Edit;
