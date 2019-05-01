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
        <div className="w-50">
          <h2 className="f4 lh-copy">What is VRS?</h2>
          <p className="lh-copy">
            VRS is a fully-functional e-commerce store, built on the serverless
            paradigm. With a single command `now`, the store deploys instantly,
            scales automatically, and requires zero supervision.
          </p>
          <h2 className="f4 lh-copy">Can it handle high traffic?</h2>
          <p className="lh-copy">
            Since VRS is deployed with
            <a className="link dim white underline" href="https://zeit.co/now">
              Now
            </a>
            , the underlying infrastructure can handle peak time traffic with
            consistently blazing fast performance. Thanks to the caching done on
            the expansive{" "}
            <a className="link dim white underline" href="https://zeit.co/cdn">
              ZEIT CDN network
            </a>{" "}
            customers located anywhere enjoy equally low latency.
          </p>
          <h2 className="f4 lh-copy">Is it expensive?</h2>
          <p className="lh-copy">
            The source-code for VRS is completely free and{" "}
            <a
              className="link dim white underline"
              href="https://github.com/zeit/vrs"
            >
              open source
            </a>
            . Now has a generous free tier, which is sufficient to deploy VRS
            and try it out. Thanks to the on-demand pricing model, for
            production usage, owners of the store don’t pay a cent for
            infrastructure during idle time. What’s more — thanks to serverless
            pre-rendering, even dynamic content can be served through cache,
            resulting in drastic savings on server bills.
          </p>
          <h2 className="f4 lh-copy">How do I set it up?</h2>
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
          <h2 className="f4 lh-copy">Why did you make this?</h2>
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
