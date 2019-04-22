/**
 * Created by shu on 7/5/2017.
 */

import Layout from "../components/Layout";
import Slider from "../components/Slider";

export default function Index({ cartState, incrementQuantity, decrementQuantity }) {
  return (
      <Layout cartState={cartState} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}>
      <section>
        <Slider />
      </section>
    </Layout>
  );
}
