// - App config

const express = require("express"),
  stripe = require("stripe")(
    "sk_test_51IOvMXBiilgt3voLfUg3Zf2sSB8UXRKxn1rEXfDh3vUOCBpgSscYOC3d0kmJUKkw2XS6tWRKbnuUZwFCDYKa5ZaS00cHgE4KoX"
  );
const app = express();

// - Middlewares
app.use(express.json());

// - API routes
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "brl", // COUNTRY CODE OF CURRENCY
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = app;
