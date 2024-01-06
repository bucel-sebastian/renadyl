"use client";
import Link from "next-intl/link";
import React, { Suspense } from "react";
import { FaPencil } from "react-icons/fa6";
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
        <Link
          href="/checkout#shipping"
          className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
        >
          <FaPencil className="text-sm mb-[1px]" />
          Modifica
        </Link>
      </div>
    </>
  );
}

export default ShippingBox;
