"use client";
import React from "react";
import { useSelector } from "react-redux";

function PaymentBox() {
  const { shipping, payment } = useSelector((state) => state.cart.checkoutData);
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div></div>
        {shipping.type === "courier" && shipping.countryKey === "RO" ? (
          <>
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
