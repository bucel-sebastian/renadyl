"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import { FaMinus, FaPlus } from "react-icons/fa6";
import CartItem from "./CartItem";
import { setCurrencyAndCountryCode } from "@/redux/slices/cartSlice";

function CartProductsBox() {
  const [countryCode, setCountryCode] = useState(null);

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  console.log(cart);

  const dispatch = useDispatch();

  const t = useTranslations("Cart");

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    dispatch(
      setCurrencyAndCountryCode({
        countryCode: data.country_code,
        currency: data.country_code === "RO" ? "RON" : "EURO",
      })
    );
    // setCountryCode(data.country_code);
  };

  useEffect(() => {
    if (checkoutData.countryCode === null || checkoutData.currency === null) {
      getIpCountry();
    }
  }, [checkoutData]);

  useEffect(() => {
    console.log("Se updateaza cart");
    setCartItems(cart);
  }, [cart]);

  return (
    <>
      {checkoutData.countryCode !== null ? (
        <>
          {cartItems && cartItems?.length === 0 ? (
            <>
              <h2>{t("empty-cart")}</h2>
            </>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <CartItem
                  key={item.productName}
                  itemName={item.productName}
                  itemQuantity={item.quantity}
                  countryCode={checkoutData.countryCode}
                  lastItem={index + 1 === cart.length}
                />
              ))}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CartProductsBox;
