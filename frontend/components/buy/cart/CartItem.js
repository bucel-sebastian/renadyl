"use client";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  inputCartQuantity,
} from "@/redux/slices/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch } from "react-redux";

function CartItem({ itemName, countryCode, lastItem, itemQuantity }) {
  const dispatch = useDispatch();

  const [itemData, setProductData] = useState({});

  const getProductData = async (countryCode, itemName) => {
    const response = await fetch(
      `/api/data/json/product/${countryCode}/${itemName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setProductData({
      productName: data?.body?.product_name,
      currency: data?.body?.currency,
      price: data?.body?.price,
      onSale: data?.body?.on_sale,
      salePrice: data?.body?.sale_price,
      salePercentage: data?.body?.sale_percentage,
      saleValue: data?.body?.sale_value,
    });
  };

  const t = useTranslations("Cart");

  const decrementItemQuantity = () => {
    dispatch(decrementQuantity(itemData.productName));
  };

  const incrementItemQuantity = () => {
    dispatch(incrementQuantity(itemData.productName));
  };

  const handleChangeProductQuantity = (e) => {
    const newQuantity = e.target.value;
    if (newQuantity <= 0 && newQuantity !== "") {
      return;
    } else if (newQuantity === "") {
      dispatch(
        inputCartQuantity({
          productName: itemData.productName,
          quantity: 1,
        })
      );
      return;
    }
    dispatch(
      inputCartQuantity({
        productName: itemData.productName,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = () => {
    if (confirm(t("delete-item-check")))
      dispatch(removeFromCart(itemData.productName));
  };

  useEffect(() => {
    getProductData(countryCode, itemName);
  }, []);

  return (
    <div
      className={`w-full py-4 flex flex-row ${
        lastItem ? "" : "border-b-foregroundPrimary20 border-b-[1px]"
      }`}
    >
      <div className="w-1/6 h-max px-4">
        <Image
          src={
            itemData.productName === "renal_single"
              ? "/images/product_image_1.png"
              : "/images/product_image_2.png"
          }
          alt=""
          width={1000}
          height={1000}
          className="w-full aspect-square"
        />
      </div>
      <div className="w-5/6 flex flex-row justify-between">
        <div className="h-full flex flex-col justify-between">
          <h1 className="text-xl font-bold ">
            {itemData.productName === "renal_single"
              ? t("renal-single-long-name")
              : t("renal-bundle-long-name")}
          </h1>
          <div className="">
            <div className="rounded-xl border-[1px] border-foregroundPrimary20 w-max flex flex-row items-center content-center justify-center overflow-hidden text-xl h-[45px]">
              <button
                onClick={decrementItemQuantity}
                className="w-1/3 bg-backgroundPrimary hover:bg-gradientPurple hover:text-backgroundPrimary transition-all flex justify-center items-center content-center h-full"
                disabled={itemQuantity === 1}
              >
                <FaMinus />
              </button>
              <input
                className="w-1/3 text-center h-full [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={itemQuantity}
                min={1}
                onChange={handleChangeProductQuantity}
                disabled
              />
              <button
                onClick={incrementItemQuantity}
                className="w-1/3 bg-backgroundPrimary flex justify-center items-center content-center h-full hover:bg-gradientPurple hover:text-backgroundPrimary transition-all"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        <div className="h-full flex items-end">
          <div className="max-md:mb-4 w-full">
            <div className="flex flex-row justify-end items-end text-[#fe0000]">
              <button onClick={handleRemoveItem}>{t("delete-item")}</button>
            </div>
            <div className="text-2xl w-full flex justify-end items-end">
              <div>
                {itemData.onSale ? (
                  <div className="flex justify-between items-center content-center text-lg">
                    <span>
                      <del>
                        {itemData.price} {itemData.currency}
                      </del>
                    </span>
                    <span className="bg-gradient-to-r from-gradientGreen to-gradientPurple text-backgroundPrimary ml-2 rounded-full px-4">
                      - {itemData.saleValue}{" "}
                      {itemData.salePercentage ? "%" : itemData.currency}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex justify-end">
                  <span className="font-extrabold">
                    {itemData.onSale ? itemData.salePrice : itemData.price}{" "}
                    {itemData.currency}
                  </span>{" "}
                  /&nbsp;
                  <span>{t("product-unit")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

// {/* <div className="mt-4">
//                     <label>{t("quantity-label")}</label>
//                     <div className="rounded-xl border-[1px] border-foregroundPrimary20 w-max flex flex-row items-center content-center justify-center overflow-hidden text-xl h-[45px]">
//                       <button
//                         onClick={decrementQuantity}
//                         className="w-1/3 bg-backgroundPrimary hover:bg-gradientPurple hover:text-backgroundPrimary transition-all flex justify-center items-center content-center h-full"
//                         disabled={itemData.quantity === 1}
//                       >
//                         <FaMinus />
//                       </button>
//                       <input
//                         className="w-1/3 text-center h-full [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
//                         type="number"
//                         value={itemData.quantity}
//                         min={1}
//                         onChange={handleChangeProductQuantity}
//                       />
//                       <button
//                         onClick={incrementQuantity}
//                         className="w-1/3 bg-backgroundPrimary flex justify-center items-center content-center h-full hover:bg-gradientPurple hover:text-backgroundPrimary transition-all"
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
//                   </div> */}
