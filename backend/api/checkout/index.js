const app = require("../../utils/app");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.post("*", async (req, res) => {
  const { amount, token } = req.body;
  console.log("AMOUNT:", amount);
  console.log("TOKEN:", token);
  try {
    const { status } = await stripe.charges.create({
      amount: parseInt(amount),
      currency: "usd",
      description: "VRS",
      source: token
    });
    res.json({ status });
  } catch ({ message }) {
    res.status(400).json({ error: message || "uh oh " });
  }
});

module.exports = app;
