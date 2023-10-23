"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter, usePathname } from "next-intl/client";

function AddToCartButtonHome({ currentLocale }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("Index");

  const dispatch = useDispatch();

  const { cartQuantity } = useSelector((state) => state.cart);
  const handleAddToCart = () => {
    setIsDisabled(true);
    dispatch(addToCart(cartQuantity));
    router.push("/cart", { locale: currentLocale });
  };
  return (
    <button
      onClick={handleAddToCart}
      // href="/buy"
      // href="https://www.emag.ro/renadyl-pentru-insuficienta-renala-60-comprimate-rnd/pd/D1D5C3YBM/?cmpid=101143&gclid=CjwKCAjwsKqoBhBPEiwALrrqiI6-RpbKtsr_0UzHmEIo-6DLzegwvfrY7Lsg0TlhXC7_rcIdUbQIihoCoPgQAvD_BwE"
      className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3"
      disabled={isDisabled}
    >
      {t("buy-btn")}
    </button>
  );
}

export default AddToCartButtonHome;
