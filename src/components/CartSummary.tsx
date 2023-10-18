import React, { useState, useEffect } from "react";

import StripeTestCards from "./StripeTestCards";

import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../../utils/api-helpers";

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { formattedTotalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const [userId, setUserId] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId") ?? "");
    }
  }, []);
  // useEffect(() => {
  //   console.log(Object.values(cartDetails)[0]);
  //   let product = Object.values(cartDetails)[0]?.name;
  //   let price = Object.values(cartDetails)[0]?.formattedValue;
  //   setOrderDetail({ product: product, price: price });
  // }, [cartDetails]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const firstCartItem = Object.values(cartDetails?.items || [])[0];
      if (firstCartItem) {
        const product = firstCartItem.name;
        const price = firstCartItem.formattedValue;
        setOrderDetail({ product, price });
      }
    }
  }, [cartDetails]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    let orderData: any;
    let orderId: any;
    const postData = async () => {
      console.log("in");
      try {
        const response = await fetch("/api/order/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            user: `${userId}`,
          },
          body: JSON.stringify(orderDetail),
        });
        orderData = await response.json();
        orderId = orderData ? orderData._id : "No Order ID";
        console.log("没进去前,orderId的值", orderId);
        console.log({ cartDetails, orderId });
        const response2 = await fetchPostJSON(
          "https://serverless-shopping-frontend-pkfd0415w-jasonzhwang.vercel.app/api/checkout_sessions/cart",
          {
            cartDetails,
            orderId,
          }
        );

        redirectToCheckout(response2.id);
      } catch (err) {
        console.log(err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        setErrorMessage(errorMessage);
        setLoading(false);
      }
    };
    postData();
  };

  return (
    <form onSubmit={handleCheckout} className="flex flex-col">
      <h2>Cart summary</h2>
      {errorMessage ? <p style={{ color: "red" }}>Error: {errorMessage}</p> : null}
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      {/* Redirects the user to Stripe */}
      <StripeTestCards />
      <button
        className="mt-5 block w-full rounded-full bg-[#008080] px-4 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-gray-300"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Checkout
      </button>
      <button
        className="mt-5 block w-full rounded-full bg-[#008080] px-4 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-gray-300"
        type="button"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </form>
  );
};

export default CartSummary;
