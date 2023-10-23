"use client";

import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

function AddToCartButton() {
  const [countryCode, setCountryCode] = useState(null);

  const [productData, setProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });

  const t = useTranslations("Product");

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
  };

  const dispatch = useDispatch();

  const { cartQuantity } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    console.log("cant din cos ", cartQuantity);
    dispatch(addToCart(cartQuantity));
  };

  const getProductData = async (countryCode) => {
    const response = await fetch(`/api/data/json/product/${countryCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    await setProductData({
      currency: data.body[0].currency,
      price: data.body[0].price,
      onSale: data.body[0].on_sale,
      salePrice: data.body[0].sale_price,
      salePercentage: data.body[0].sale_percentage,
      saleValue: data.body[0].sale_value,
    });
  };

  useEffect(() => {
    getIpCountry();
  }, []);

  useEffect(() => {
    if (countryCode !== null) getProductData(countryCode);
  }, [countryCode]);

  useEffect(() => {
    console.log(productData);
  }, [productData]);
  return (
    <>
      {productData.price !== "" ? (
        <div className="max-md:mb-4 w-max max-md:mx-auto">
          <div className="text-3xl mb-4 w-max flex items-end">
            <span className="mb-[1px]">{t("hero-section.product-price")}:</span>
            &nbsp;
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
                    {productData.salePercentage ? "%" : productData.currency}
                  </span>
                </div>
              ) : (
                ""
              )}

              <div>
                <span className="font-extrabold">
                  {productData.onSale
                    ? productData.salePrice
                    : productData.price}{" "}
                  {productData.currency}
                </span>{" "}
                /&nbsp;
                <span>{t("hero-section.product-unit")}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 max-md:justify-center max-md:gap-2">
            <button
              onClick={handleAddToCart}
              // href="/buy"
              // href="https://www.emag.ro/renadyl-pentru-insuficienta-renala-60-comprimate-rnd/pd/D1D5C3YBM/?cmpid=101143&gclid=CjwKCAjwsKqoBhBPEiwALrrqiI6-RpbKtsr_0UzHmEIo-6DLzegwvfrY7Lsg0TlhXC7_rcIdUbQIihoCoPgQAvD_BwE"
              className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2.5"
            >
              {t("hero-section.product-buy-btn")}
            </button>
            {/* <button className="block bg-gradient-to-r w-[250px] from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-gradientGreen hover:text-gradientPurple rounded-2xl p-[3px]">
              <div className="bg-backgroundPrimary rounded-xl py-2.5 ">
                  {t("hero-section.product-subscription-btn")}
              </div>
          </button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AddToCartButton;
