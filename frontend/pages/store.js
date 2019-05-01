import Link from "next/link";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import fetch from "isomorphic-unfetch";

function Store({
  products,
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
      <article className="pt5 bg-black white ph3">
        <a className="link white tc">
          <p>
            <i className="material-icons md-48 v-top">store</i>
          </p>
          <h1 className="tc f3 mb4">Model Store</h1>
        </a>
        <div className="pa2 flex flex-wrap">
          {Array.isArray(products) &&
            products.map(product => (
              <div
                style={{ height: "350px" }}
                className="fl w-100 w-50-m w-33-l pa2"
                key={product.id}
              >
                <Link href={`/model?id=${product.id}`}>
                  <a className="db link dim tc white">
                    <img
                      style={{ objectFit: "contain", height: "200px" }}
                      src={`/static/models/${product.id}/thumbnail@m.jpg`}
                      alt="Lorem"
                      className="w-100 db outline black-10"
                    />
                    <dl className="mt2 f6 lh-copy">
                      <dt className="clip">Name</dt>
                      <dd className="ml0 white truncate w-100">
                        {product.name}
                      </dd>
                      <dt className="clip">Description</dt>
                      <dd className="ml0 gray truncate w-100">
                        {product.description}
                      </dd>
                    </dl>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </article>
      <Footer />
    </Layout>
  );
}

Store.getInitialProps = async ({ req }) => {
  let URL;

  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      URL = `https://${req.headers.host}/api/get-products`;
    } else {
      URL = `https://localhost:3000/api/get-products`;
    }
  } else {
    URL = "/api/get-products";
  }

  const props = { products: [] };

  try {
    const response = await fetch(URL);
    const { docs } = await response.json();
    props.products = docs;
  } catch (e) {
    console.error(e.message);
  }
  return props;
};

export default Store;
