import { injectStripe } from "react-stripe-elements-universal";
import { CardElement } from "react-stripe-elements-universal";

function CheckoutForm(props) {
  function handleSubmit() {
    console.log("checking out...");
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
    </form>
  );
}

export default injectStripe(CheckoutForm);
