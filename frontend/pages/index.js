/**
 * Created by shu on 7/5/2017.
 */

import Layout from "../components/Layout";
import Slider from "../components/Slider";

export default function Index({ cartState, incrementQuantity, decrementQuantity, removeFromCart }) {
  return (
      <Layout cartState={cartState} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart}>
      <section>
        <Slider />
      </section>
    </Layout>
  );
}
