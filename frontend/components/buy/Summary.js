"use client";

import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Script from "next/script";
import { useRouter } from "next-intl/client";

function Summary() {
  const router = useRouter();

  const { loading, checkoutData } = useSelector((state) => state.checkoutData);

  if (checkoutData === null) {
    console.log("redirectioneaza inapoi");
    router.replace("/checkout");
  }

  const [productDetailsLoading, setProductDetailsLoading] = useState(true);

  const [countryCode, setCountryCode] = useState(null);

  const { cartQuantity } = useSelector((state) => state.cart);
  const [productData, setProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });

  const [shippingPrice, setShippingPrice] = useState(25);

  const t = useTranslations("Order-summary");

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
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
    if (productData.price) {
      setProductDetailsLoading(false);
    }
  }, [productData]);

  return (
    <>
      <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 mb-12 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        <div className="p-8 bg-backgroundPrimary">
          <h2 className="text-2xl">{t("title")}</h2>

          <div className="w-full flex flex-col mb-2">
            <label className="px-1 text-foregroundPrimary70">
              {/* {t("billing-form.address-label")} */}
            </label>
            <input
              // placeholder={t("billing-form.address-ph")}
              type="text"
              name="billing-address"
              className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              required
            />{" "}
            <button type="button">aplica</button>
          </div>

          <div className="flex flex-row gap-12">
            <div className="w-2/3 border-r-[1px] border-foregroundPrimary20 pr-8">
              <table className="w-full ">
                <tbody className="w-full">
                  <tr>
                    <td className="text-left">{t("total-products")}:</td>
                    <td className="text-right">
                      {cartQuantity *
                        (productData.onSale
                          ? productData.salePrice
                          : productData.price)}{" "}
                      {productData.currency}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left">{t("total-shipping")}:</td>
                    <td className="text-right">
                      {shippingPrice} {productData.currency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/3">
              <h3 className="text-xl font-bold">{t("total-order")}:</h3>
              <h2 className="text-2xl font-bold">
                {parseFloat(shippingPrice) +
                  parseFloat(
                    cartQuantity *
                      (productData.onSale
                        ? productData.salePrice
                        : productData.price)
                  )}{" "}
                {productData.currency}
              </h2>
              <label>
                <input type="checkbox" name="tc" required />
                {t("tc-1")}
              </label>
              <button
                disabled={false}
                type="submit"
                // onClick={handleOrderSubmitButton}
                className="block mt-4 bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
              >
                {t("place-order")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Summary;
