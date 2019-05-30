const app = require("../../utils/app");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.post("*", async (req, res) => {
  const { amount, token } = req.body;
  const testToken = 'tok_visa'  // Use 4242 4242 4242 4242 Visa for testing
  try {
    const { status } = await stripe.charges.create({
      amount: parseInt(amount),
      currency: "usd",
      description: "VRS",
      // source: token
      // TODO: Uncomment the above code to use the live token returned from Stripe
      source: testToken
    });
    res.json({ status });
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
});

module.exports = app;
