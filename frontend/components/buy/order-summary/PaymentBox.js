"use client";
import React from "react";
import { useSelector } from "react-redux";

function PaymentBox() {
  const { shipping, payment } = useSelector((state) => state.cart.checkoutData);
  return (
    <>
      <div className="flex flex-col justify-between gap-4 h-4/5">
        <div></div>
        {shipping.type === "courier" && shipping.countryKey === "RO" ? (
          <>
            <p className="text-center">
              {payment === "card" ? "Online cu cardul" : "Ramburs la livrare"}
            </p>
            <button className="block relative w-max mx-auto">Modifica</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default PaymentBox;
