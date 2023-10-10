import { NextPage } from "next";
import { useEffect } from "react";

import Cart from "../components/Cart";
import CartSummary from "../components/CartSummary";
import Products from "../components/Products";

const shoppingCartPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Cart>
        <CartSummary />
        <Products />
      </Cart>
    </div>
  );
};

export default shoppingCartPage;
