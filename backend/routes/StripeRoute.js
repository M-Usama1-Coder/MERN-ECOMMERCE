const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51MAh2CDiZA7C4HtWXFFLVtrjYiBfwvfItIxQm4HNLkwR8AKXBFmcg5MEG3TuV2KJf0SkRvQWMjF4aUTXlUH7EfdC00NHzmTfyy"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
