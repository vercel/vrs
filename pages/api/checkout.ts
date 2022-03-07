const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  const { amount, token } = req.body;

  try {
    const { status } = await stripe.charges.create({
      amount: parseInt(amount),
      currency: "usd",
      description: "VRS",
      source: token
    });

    res.status(200).json({ status })
  } catch ({ message }) {
    res.status(400).json({ error: message });
  }
}