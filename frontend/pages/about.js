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
        <div className="items-center">
          <p className="lh-copy">
            VRS is a fully-functional e-commerce store, built on the serverless
            paradigm. With a single command `now`, the store deploys instantly,
            scales automatically, and requires zero supervision.
          </p>
          <p className="lh-copy">
            Since VRS is deployed with{' '}
            <a className="link dim white underline" href="https://zeit.co/now">
              Now
            </a>
            , the underlying infrastructure can handle peak time traffic with
            consistent, blazing-fast performance. Thanks to the caching done on
            the expansive{" "}
            <a className="link dim white underline" href="https://zeit.co/cdn">
              ZEIT CDN network
            </a>,
            customers located anywhere can enjoy equally low latency.
          </p>
          <p className="lh-copy">
            The source-code for VRS is completely free and{" "}
            <a
              className="link dim white underline"
              href="https://github.com/zeit/vrs"
            >
              open source
            </a>
            . You can deploy VRS to our scalable serverless infrastructure{' '}
            <strong>free of cost</strong>. Thanks to the on-demand pricing model, for
            production usage, owners of the store don’t pay a cent for
            infrastructure during idle time.
            <br/>
            <br/>
            What’s more — thanks to serverless
            pre-rendering, even dynamic content can be served through cache,
            resulting in drastic savings on server bills.
          </p>
          <p className="lh-copy">
            The code for this demo is completely open source. Once you have{" "}
            <a
              className="link dim white underline"
              href="https://zeit.co/download"
            >
              Now CLI
            </a>{" "}
            installed, clone the{" "}
            <a
              className="link dim white underline"
              href="https://github.com/zeit/vrs"
            >
              VRS repo
            </a>
            , specify the necessary secrets with Now CLI, and run `now` — that’s
            it. The{" "}
            <a
              className="link dim white underline"
              href="https://zeit.co/blog/serverless-ecommerce"
            >
              deployment section on our blog post
            </a>
            explains how you can specify the secrets.
          </p>
          <p className="lh-copy">
            Our mission at ZEIT is to make the cloud accessible to everyone. We
            do that by creating products that improve developer experience,
            provisioning infrastructure that is globally available, and by
            teaching the developer community about serverless-related
            technology. We made VRS to showcase that it’s possible to create a
            fully functional, high-performance e-commerce store without
            requiring infrastructure know-how. Let us know how we did on{" "}
            <a
              className="link white underline dim"
              href="https://twitter.com/zeithq"
            >
              Twitter
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
