/**
 * Created by shu on 7/5/2017.
 * Refactored by coetry on 3/25/2019.
 */

import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default ({ cartState }) => (
    <Layout cartState={cartState}>
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
