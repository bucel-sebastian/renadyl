"use client";
import React from "react";
import { useSelector } from "react-redux";

function BillingBox() {
  const { billing, shipping } = useSelector((state) => state.cart.checkoutData);
  console.log(billing);
  return (
    <>
      <div className="flex flex-col justify-between gap-4">
        <div>
          {billing.asShipping === true ? (
            <>
              <h3 className="text-center">Persoana fizică</h3>
              <p className="text-center">
                {shipping.address}, {shipping.postalCode}, {shipping.city},{" "}
                {shipping.state}, {shipping.country}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-center">
                {billing.entity === "pf" ? (
                  <>Persoana fizică</>
                ) : (
                  <>Persoana juridică</>
                )}
              </h3>
            </>
          )}
        </div>
        <button className="block relative w-max mx-auto">Modifica</button>
      </div>
    </>
  );
}

export default BillingBox;
