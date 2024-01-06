"use client";
import Link from "next-intl/link";
import React from "react";
import { FaPencil } from "react-icons/fa6";
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
            <Link
              href="/checkout#payment"
              className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
            >
              <FaPencil className="text-sm mb-[1px]" />
              Modifica
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default PaymentBox;
