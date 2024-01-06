"use client";
import React from "react";
import Link from "next-intl/link";

import { FaPencil } from "react-icons/fa6";
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
        <Link
          href="/checkout#billing"
          className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
        >
          <FaPencil className="text-sm mb-[1px]" />
          Modifica
        </Link>
      </div>
    </>
  );
}

export default BillingBox;
