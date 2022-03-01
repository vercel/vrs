import fetch from "isomorphic-unfetch";

import Layout from "../../components/Layout";
import Editor from "../../components/Editor";
import { fetchData } from "../../utils/fetchData";

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

export async function getStaticProps(props) {
  const docs = await fetchData(`/api/get-product?id=${props.params.id}`);

  return {
    props: {
      details: docs[0]
    },
  };
};

export async function getStaticPaths() {
  const docs = await fetchData(`/api/get-products`);

  return {
    paths: docs.map(doc => ({
      params: { id: `${doc.id}` }
    })),
    fallback: false
  }
}

export default Model;
