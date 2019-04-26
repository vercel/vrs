/**
 * Created by shu on 10/5/2017.
 */

import { useEffect } from "react";
import Editor from "../components/Editor";

function Edit({ addToCart, details }) {
  return <Editor details={details} addToCart={addToCart} />;
}

Edit.getInitialProps = async function({ req, query }) {
  const { id } = query;
  let URL;

  if (typeof window === "undefined") {
    if (process.env.NODE === "production") {
      URL = `https://${req.headers.host}/api/get-product?id=${id}`;
    } else {
      URL = `http://${req.headers.host}/api/get-product?id=${id}`;
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

export default Edit;
