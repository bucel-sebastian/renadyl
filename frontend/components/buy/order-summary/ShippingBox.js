"use client";
import React from "react";
import { useSelector } from "react-redux";

function ShippingBox() {
  const { shipping } = useSelector((state) => state.cart.checkoutData);
  console.log(shipping);
  return (
    <>
      <div className="relative h-full flex flex-col justify-between">
        <div>
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
        </div>
        <button className="block relative w-max mx-auto">Modifica</button>
      </div>
    </>
  );
}

export default ShippingBox;


2caa1e06428fa784a68b799c6a42bcb81545f1a2