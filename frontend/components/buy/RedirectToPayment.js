import { resetCartData } from "@/redux/slices/cartSlice";
import { persistor } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function RedirectToPayment({ netopiaEnvKey, netopiaData }) {
  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);

  useEffect(() => {
    persistor.purge();
    document.getElementById("netopiaDataFrom").submit();
  }, []);
  useEffect(() => {
    console.log("cart - ", cart);
  }, [cart, checkoutData]);
  return (
    <>
      <form
        className="hidden"
        id="netopiaDataFrom"
        action="https://sandboxsecure.mobilpay.ro"
        method="POST"
      >
        <input type="hidden" name="env_key" value={netopiaEnvKey} />
        <input type="hidden" name="data" value={netopiaData} />
      </form>
    </>
  );
}

export default RedirectToPayment;
