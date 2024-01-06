"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter, usePathname } from "next-intl/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCartButtonHome({ currentLocale }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const t = useTranslations("Index");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsDisabled(true);
    dispatch(addToCart({ productName: "renal_single" }));
    toast.success(t("add-to-cart-success"), {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    router.push("/cart", { locale: currentLocale });
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="block bg-gradient-to-r w-[300px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3 cursor-pointer"
        disabled={isDisabled}
      >
        {t("buy-btn")}
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AddToCartButtonHome;
