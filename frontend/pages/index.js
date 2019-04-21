/**
 * Created by shu on 7/5/2017.
 */

import Layout from "../components/Layout";
import Slider from "../components/Slider";

export default function Index({ cartState }) {
  return (
      <Layout cartState={cartState}>
      <section>
        <Slider />
      </section>
    </Layout>
  );
}
