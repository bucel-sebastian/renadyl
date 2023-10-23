"use client";

import React, { useEffect, useState } from "react";

import { FaCartShopping } from "react-icons/fa6";
import Link from "next-intl/link";
import { useSelector } from "react-redux";

function CartBtn({ currentLocale }) {
  const { loading, cartQuantity } = useSelector((state) => state.cart);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <Link href="/cart" locale={currentLocale} className="relative">
        <FaCartShopping className="text-[35px]" />
        {isHydrated && cartQuantity > 0 ? (
          <>
            {cartQuantity < 10 ? (
              <span className="absolute -top-2 -right-2 bg-gradientPurple w-[22px] h-[22px] flex items-center content-center justify-center text-backgroundPrimary rounded-full text-sm m-0 p-0 leading-3">
                {cartQuantity}
              </span>
            ) : (
              <span className="absolute -top-2 -right-2 bg-gradientPurple w-[22px] h-[22px] flex items-center content-center justify-center text-backgroundPrimary rounded-full text-sm m-0 p-0 leading-3">
                +9
              </span>
            )}
          </>
        ) : (
          ""
        )}
      </Link>
    </>
  );
}

export default CartBtn;
