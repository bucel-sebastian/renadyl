"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { FaMinus, FaPlus } from "react-icons/fa6";
import CartItem from "./CartItem";

function CartProductsBox() {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);

  const t = useTranslations("Cart");

  return (
    <>
      <Suspense fallback={""}>
        {cart && cart?.length === 0 ? (
          <>
            <h2>{t("empty-cart")}</h2>
          </>
        ) : (
          <>
            {cart.map((item, index) => (
              <CartItem
                key={index}
                itemData={item}
                lastItem={index + 1 === cart.length}
              />
            ))}
          </>
        )}
      </Suspense>
    </>
  );
}

export default CartProductsBox;
