import express from "express";
import Stripe from "stripe";
import config from "config";
const stripe = Stripe(config.get('STRIPE_KEY'));

export const stripeRouter = express.Router();

stripeRouter.post("/payment", async (req, res) => {
    try {
        const { tokenId, amount } = req.body;

        const payment = await stripe.charges.create({
            source: tokenId,
            amount: amount,
            currency: "usd",
        });

        res.status(200).json({ success: true, message: "Payment successful", payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
});
