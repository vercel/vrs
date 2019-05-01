import { useState } from "react";
import { injectStripe } from "react-stripe-elements-universal";
import { CardElement } from "react-stripe-elements-universal";

function CheckoutForm({ totalPrice, stripe, clearCart }) {
  const [status, setStatus] = useState("default");
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    if (stripe) {
      try {
        const { token } = await stripe.createToken();
        console.log("STRIPE TOKEN:", token);
        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify({
            // convert to cents for stripe
            amount: totalPrice * 100,
            token: token.id
          }),
          headers: {
            "content-type": "application/json"
          }
        });

        if (!res.ok) {
          setStatus("error");
        }

        const json = await res.json();
        console.log("STRIPE PURCHASE STATUS:", json);
        clearCart();
        setStatus("success");
      } catch ({ message }) {
        setStatus("error");
        throw new Error(message);
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        style={{
          base: { fontFamily: "Space Mono, monospace", color: "black" }
        }}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`Cart__checkout button ${
          status === "success" ? "success" : ""
        } `}
      >
        {status === "default" && "Checkout"}
        {status === "submitting" && "Submitting ..."}
        {status === "success" && "Payment Complete!"}
        {status === "error" && "Error!"}
      </button>
    </form>
  );
}

export default injectStripe(CheckoutForm);
