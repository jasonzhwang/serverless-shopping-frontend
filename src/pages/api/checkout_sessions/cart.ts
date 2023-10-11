import { NextApiRequest, NextApiResponse } from "next";

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
const { validateCartItems } = require("use-shopping-cart/utilities");
import inventory from "../../../data/products";

import Stripe from "stripe";
if (!process.env.STRIPE_SECRET_KEY) throw new Error("process.env.STRIPE_SECRET_KEY not found");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { cartDetails, orderId } = req.body;
      console.log("order id 的值", orderId);
      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(inventory as any, cartDetails);
      const hasSubscription = line_items.find((item: any) => {
        return !!item.price_data.recurring;
      });
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        // billing_address_collection: "auto",
        // shipping_address_collection: {
        //   allowed_countries: ["US", "CA", "AU"],
        // },
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/use-shopping-cart`,
        mode: hasSubscription ? "subscription" : "payment",
        metadata: { orderId: orderId },
      };

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      const statusCode = err instanceof Error ? 500 : 400; // You can set the status code based on the error type

      res.status(statusCode).json({ statusCode, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
