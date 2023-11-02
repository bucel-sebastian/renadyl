"use client";

import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Script from "next/script";
import { useRouter } from "next-intl/client";
import Image from "next/image";

import { FaXmark } from "react-icons/fa6";
import Link from "next-intl/link";
import RedirectToPayment from "./RedirectToPayment";

function Summary() {
  const router = useRouter();

  const { loading, checkoutData } = useSelector((state) => state.checkoutData);

  console.log(checkoutData);

  const [promocode, setPromocode] = useState("");
  const [promocodeData, setPromocodeData] = useState(null);
  const [promocodeError, setPromocodeError] = useState(false);

  if (checkoutData === null) {
    console.log("redirectioneaza inapoi");
    router.replace("/checkout");
  }

  const [productDetailsLoading, setProductDetailsLoading] = useState(false);

  const [countryCode, setCountryCode] = useState(null);

  const { cartQuantity } = useSelector((state) => state.cart);
  const [productData, setProductData] = useState(
    checkoutData.order.productData
  );

  const [shippingPrice, setShippingPrice] = useState(25);

  const [orderData, setOrderData] = useState({
    // shipping + ((products - promo.bundle) - promo.code)
    total: 0,
    // cartQuantity * (productData.onSale ? (productData.salePrice) : (productData.price))
    products: 0,
    shipping: 0,
    promo: {
      // (cartQuantity >= bundleQuantity ? (cartQuantity * bundleSaleValue) : (0))
      bundle: 0,
      // (promocodeData !== null ? ((products-promo.bundle) * (promocodeData.value / 100)) : (0))
      promocode: 0,
    },
  });

  const [havePaymentData, setHavePaymentData] = useState(false);
  const [netopiaEnvKey, setNetopiaEnvKey] = useState(null);
  const [netopiaData, setNetopiaData] = useState(null);

  const t = useTranslations("Order-summary");

  // const getIpCountry = async () => {
  //   const response = await fetch("https://ipapi.co/json/");
  //   const data = await response.json();
  //   setCountryCode(data.country_code);
  // };

  // const getProductData = async (countryCode) => {
  //   const response = await fetch(`/api/data/json/product/${countryCode}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await response.json();

  //   await setProductData({
  //     currency: data.body[0].currency,
  //     price: data.body[0].price,
  //     onSale: data.body[0].on_sale,
  //     salePrice: data.body[0].sale_price,
  //     salePercentage: data.body[0].sale_percentage,
  //     saleValue: data.body[0].sale_value,
  //   });
  // };

  // useEffect(() => {
  //   getIpCountry();
  // }, []);

  // useEffect(() => {
  //   if (countryCode !== null) getProductData(countryCode);
  // }, [countryCode]);

  // useEffect(() => {
  //   if (productData.price) {
  //     setProductDetailsLoading(false);
  //   }
  // }, [productData]);

  const calculateOrderData = () => {
    const productsTotal =
      cartQuantity *
      (productData?.onSale ? productData?.salePrice : productData?.price);

    const bundleTotal =
      cartQuantity >= productData.bundleQuantity
        ? productData.bundlePercent === true
          ? (productData?.onSale
              ? productData?.salePrice
              : productData?.price) *
            (productData?.bundleSaleValue / 100)
          : cartQuantity * productData.bundleSaleValue
        : 0;

    const promocodeTotal =
      promocodeData !== null
        ? (productsTotal - bundleTotal) * (promocodeData?.value / 100)
        : 0;

    const shippingTotal = checkoutData?.order?.shippingCost
      ? checkoutData?.order?.shippingCost
      : 0;

    const orderTotal =
      shippingTotal + (productsTotal - bundleTotal - promocodeTotal);

    console.log("calculele", {
      total: orderTotal,
      products: productsTotal,
      shipping: shippingTotal,
      promo: {
        bundle: bundleTotal,
        promocode: promocodeTotal,
      },
    });
    setOrderData({
      total: orderTotal,
      products: productsTotal,
      shipping: shippingTotal,
      promo: {
        bundle: bundleTotal,
        promocode: promocodeTotal,
      },
    });
  };

  const handlePromocodeChange = (e) => {
    const { value } = e.target;
    setPromocode(value);
  };

  const submitPromocode = async (e) => {
    e.preventDefault();

    const formData = new Object();
    formData["code"] = promocode;

    const response = await fetch("/api/check-promocode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJson = await response.json();
      console.log("response JSON ", responseJson);
      const body = await responseJson.body;
      if (body !== null) {
        console.log(body[0]);
        setPromocodeData(body[0]);
        e.target.reset();
        setPromocodeError(false);
      } else {
        setPromocodeError(true);
      }
    } else {
      setPromocodeError(true);
    }
  };

  const removePromocode = (e) => {
    e.preventDefault();
    setPromocodeData(null);
    setPromocode("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const formData = new Object();
    formData["orderData"] = orderData;
    formData["checkoutData"] = checkoutData;
    formData["promocodeData"] = promocodeData;
    formData["cartQuantity"] = cartQuantity;

    console.log("formData", formData);
    const response = await fetch("/api/place-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseJson = await response.json();
      console.log("response", responseJson.body);
      const body = await responseJson.body;
      console.log("body", body);
      const { env_key, data } = await body.paymentData;
      console.log("env si data", env_key, data);
      if (env_key !== null && data !== null) {
        setNetopiaEnvKey(env_key);
        setNetopiaData(data);
        setHavePaymentData(true);
      }
    }
  };

  useEffect(() => {
    calculateOrderData();
  }, [promocodeData, productData]);

  useEffect(() => {
    console.log("product data - ", productData);
  }, [productData]);
  return (
    <>
      <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 mb-12 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        <div className="p-8 bg-backgroundPrimary">
          <h2 className="text-2xl">{t("title")}</h2>

          <div>
            <div className="w-full flex flex-row gap-8">
              <div className="w-1/5">
                <Image
                  src="/images/product_image_3.png"
                  width={1000}
                  height={1000}
                  className="w-[75%] mx-auto drop-shadow-lg "
                />
              </div>
              <div className="w-4/5 ">
                <div className="flex flex-row justify-between items-center content-center">
                  <h2 className="font-bold text-2xl">{t("product-name")}</h2>
                  <span className="font-bold text-2xl">
                    {cartQuantity} {t("product-unit")} x{" "}
                    {productData.onSale
                      ? productData.salePrice
                      : productData.price}{" "}
                    {productData.currency}
                  </span>
                </div>
                <p className="w-4/5 ">{t("product-desc")}</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            {promocodeData === null ? (
              <>
                <form
                  className="w-full flex flex-col mb-2"
                  onSubmit={submitPromocode}
                >
                  <label className="px-1 text-foregroundPrimary70">
                    {t("promocode-label")}
                  </label>
                  <div className="flex flex-row">
                    <input
                      placeholder={t("promocode-ph")}
                      type="text"
                      name="promocode"
                      value={promocode}
                      onChange={handlePromocodeChange}
                      className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 w-4/5 "
                      required
                    />{" "}
                    <button
                      type="submit"
                      className="block  bg-gradient-to-r w-1/5 from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl rounded-bl-none "
                    >
                      {t("promocode-btn")}
                    </button>
                  </div>
                  {promocodeError ? (
                    <>
                      <p className="text-[#ff0000]">
                        {t("promocode-form-error")}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </form>
              </>
            ) : (
              <>
                <div>
                  <label className=" text-foregroundPrimary70">
                    {t("promocode-label")}
                  </label>
                  <div className="w-full flex items-center content-center justify-start gap-8 m-none">
                    <span>
                      {promocodeData?.code} - {promocodeData?.value}%{" "}
                    </span>
                    <button onClick={removePromocode} className="h-full block">
                      <FaXmark />
                    </button>
                  </div>
                </div>
              </>
            )}
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
                      {orderData?.shipping} {productData.currency}
                    </td>
                  </tr>
                  {orderData?.promo?.bundle !== 0 ? (
                    <>
                      <tr>
                        <td className="text-left">{t("total-bundle-sale")}:</td>
                        <td className="text-right">
                          - {orderData.promo.bundle} {productData.currency}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                  {promocodeData ? (
                    <>
                      <tr>
                        <td className="text-left">{t("total-promocode")}:</td>
                        <td className="text-right">
                          - {orderData.promo.promocode} {productData.currency}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-1/3">
              <form onSubmit={handlePlaceOrder}>
                <h3 className="text-xl font-bold">{t("total-order")}:</h3>
                <h2 className="text-2xl font-bold">
                  {orderData.total} {productData.currency}
                </h2>
                <label className="flex gap-2 flex-row items-center content-center">
                  <input type="checkbox" name="tc" required />
                  {t("tc-1")}
                  <Link href="/useful/terms-and-conditions" target="_blank">
                    {t("tc-2")}
                  </Link>
                </label>
                <button
                  disabled={false}
                  type="submit"
                  // onClick={handleOrderSubmitButton}
                  className="block mt-4 bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                >
                  {t("place-order")}
                </button>
              </form>
              {havePaymentData ? (
                <RedirectToPayment
                  netopiaEnvKey={netopiaEnvKey}
                  netopiaData={netopiaEnvKey}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Summary;
