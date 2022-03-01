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
  const details = await fetchData(props.params.id);

  return {
    props: {
      details
    },
  };
};

export async function getStaticPaths() {
  const docs = await fetchData();

  return {
    paths: docs.map(doc => ({
      params: { id: `${doc.id}` }
    })),
    fallback: false
  }
}

export default Model;
