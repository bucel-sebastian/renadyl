"use client";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";

function ShippingBox() {
  const { shipping } = useSelector((state) => state.cart.checkoutData);
  console.log(shipping);
  return (
    <>
      <div className="relative flex flex-col justify-between gap-4">
        <div>
          <Suspense fallback={<></>}>
            <h3 className="text-center">
              {shipping.type === "courier" ? (
                <>Livrare prin curier</>
              ) : (
                <>Ridicare personala de la easybox</>
              )}
            </h3>
            <p className="text-center">
              {shipping.address}, {shipping.postalCode}, {shipping.city},{" "}
              {shipping.state}, {shipping.country}
            </p>
          </Suspense>
        </div>
        <button className="block relative w-max mx-auto">Modifica</button>
      </div>
    </>
  );
}

export default ShippingBox;
