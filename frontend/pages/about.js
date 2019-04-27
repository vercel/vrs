import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function About({
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
      <main className="pa3 pa5-ns vh-100 white dt">
        <div className="f4 lh-copy measure dtc v-mid">
          <p>
            <span className="fw6">VRS</span> is a demonstration of serverless
            e-commerce for the next generation.
          </p>
          <p>
            <span className="fw6">VRS</span> is open sourced at{" "}
            <a
              href="https://github.com/zeit/vrs"
              className="no-underline white bb"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
