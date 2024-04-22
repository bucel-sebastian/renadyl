"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

import { FaMinus, FaPlus } from "react-icons/fa6";

function Cart() {
  const [shopIsOn, setShopIsOn] = useState(true);

  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const t = useTranslations("Cart");

  const handleChangeProductQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    setProductQuantity(newQuantity);
  };

  const addQuantity = (event) => {
    event.preventDefault();
    dispatch(addToCart(cartQuantity));
  };

  const reduceQuantity = (event) => {
    event.preventDefault();
    dispatch(removeFromCart(cartQuantity));
  };

  const getIfShopIsOn = async () => {
    const response = await fetch("/api/data/json/shop-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    await setShopIsOn(data?.body?.shopStatus === "1" ? false : true);
    setIsDisabled(false);
  };
  useEffect(() => {
    getIfShopIsOn();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="w-1/6 h-max px-4">
          <Image
            src="/images/product_image_1.png"
            width={1000}
            height={1000}
            className="w-full aspect-square"
          />
        </div>
        <div className="w-5/6 flex flex-row justify-between">
          <div className="h-full flex flex-col justify-between">
            <h1 className="text-xl font-bold ">
              Renadyl - Supliment alimentar
            </h1>
            <div className="">
              <div className="rounded-xl border-[1px] border-foregroundPrimary20 w-max flex flex-row items-center content-center justify-center overflow-hidden text-xl h-[45px]">
                <button
                  onClick={reduceQuantity}
                  className="w-1/3 bg-backgroundPrimary hover:bg-gradientPurple hover:text-backgroundPrimary transition-all flex justify-center items-center content-center h-full"
                  disabled={cartQuantity === 1}
                >
                  <FaMinus />
                </button>
                <input
                  className="w-1/3 text-center h-full [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  value={cartQuantity}
                  min={1}
                  onChange={handleChangeProductQuantity}
                />
                <button
                  onClick={addQuantity}
                  className="w-1/3 bg-backgroundPrimary flex justify-center items-center content-center h-full hover:bg-gradientPurple hover:text-backgroundPrimary transition-all"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="h-full flex items-end">
            <div className="max-md:mb-4 w-full">
              <div className="text-2xl w-full flex justify-end items-end">
                <div>
                  {productData.onSale ? (
                    <div className="flex justify-between items-center content-center text-lg">
                      <span>
                        <del>
                          {productData.price} {productData.currency}
                        </del>
                      </span>
                      <span className="bg-gradient-to-r from-gradientGreen to-gradientPurple text-backgroundPrimary ml-2 rounded-full px-4">
                        - {productData.saleValue}{" "}
                        {productData.salePercentage
                          ? "%"
                          : productData.currency}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex justify-end">
                    <span className="font-extrabold">
                      {productData.onSale
                        ? productData.salePrice
                        : productData.price}{" "}
                      {productData.currency}
                    </span>{" "}
                    /&nbsp;
                    <span>{t("product-unit")}</span>
                  </div>
                </div>
                {/* <div className="mt-4">
                          <label>{t("quantity-label")}</label>
                          <div className="rounded-xl border-[1px] border-foregroundPrimary20 w-max flex flex-row items-center content-center justify-center overflow-hidden text-xl h-[45px]">
                            <button
                              onClick={reduceQuantity}
                              className="w-1/3 bg-backgroundPrimary hover:bg-gradientPurple hover:text-backgroundPrimary transition-all flex justify-center items-center content-center h-full"
                              disabled={cartQuantity === 1}
                            >
                              <FaMinus />
                            </button>
                            <input
                              className="w-1/3 text-center h-full [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              value={cartQuantity}
                              min={1}
                              onChange={handleChangeProductQuantity}
                            />
                            <button
                              onClick={addQuantity}
                              className="w-1/3 bg-backgroundPrimary flex justify-center items-center content-center h-full hover:bg-gradientPurple hover:text-backgroundPrimary transition-all"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
