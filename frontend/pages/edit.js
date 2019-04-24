/**
 * Created by shu on 10/5/2017.
 */

import { useEffect } from "react";
import Editor from "../components/Editor";

function Edit({ addToCart, details }) {
  return <Editor details={details} addToCart={addToCart} />;
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
