"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImg from "@/public/images/product_image_1.png";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";

import { FaMinus, FaPlus } from "react-icons/fa6";

function Cart({ currentLocale }) {
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
      bundleSaleValue: data.body[0].bundle_sale_value,
      bundleQuantity: data.body[0].bundle_quantity,
      bundlePercentage: data.body[0].bundle_sale_percentage,
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
      <section className="max-w-[1200px] w-full mx-auto px-4 max-md:px-2 pb-4 h-[400px]">
        {productDetailsLoading ? (
          <>
            <h1 className="text-3xl font-bold mb-4 px-2">Coșul meu</h1>
            <div className="h-[200px] flex justify-center items-center content-center">
              <span className="loader"></span>
            </div>
          </>
        ) : cartQuantity > 0 ? (
          <>
            <div className="flex flex-row gap-4 h-full">
              <div className="w-2/3 ">
                <h1 className="text-3xl font-bold mb-4 px-2">Coșul meu</h1>
                <div className="before:rounded-xl relative w-full flex flex-row  flex items-center content-center justify-center bg-backgroundPrimary p-1 z-10 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:z-0 before:from-gradientGreen before:to-gradientPurple ">
                  <div className="relative z-10 p-2 bg-backgroundPrimary content-['']  rounded-lg w-full h-full ">
                    <h2 className="text-center w-full">{t("promo-bundle")}</h2>
                  </div>
                </div>
                <div className="w-full flex flex-row max-md:flex-col">
                  <div className="w-1/3 p-2 max-md:p-0 max-md:w-full max-md:mx-auto max-md:max-w-[300px]">
                    <Image
                      src={productImg}
                      width={800}
                      height={800}
                      alt="Renadyl™"
                      priority={true}
                    />
                  </div>
                  <div className="w-2/3 p-2 max-md:px-0 max-md:w-full">
                    <h2 className="text-3xl text-bold font-bold mb-2">
                      {t("product-name")}
                    </h2>

                    <div className="max-md:mb-4 w-max">
                      <div className="text-3xl mb-4 w-max flex items-end">
                        <span className="mb-[1px]">{t("product-price")}:</span>
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
                                {productData.salePercentage
                                  ? "%"
                                  : productData.currency}
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
                            <span>{t("product-unit")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-1/3 h-max border-[1px] bg-backgroundPrimary60 border-foregroundPrimary10 shadow-lg rounded-xl p-4">
                <h2 className="font-bold text-3xl mb-4">Sumar Coș</h2>

                <table className="w-full mb-4 text-xl">
                  <tbody>
                    <tr className="border-b-[1px] border-foregroundPrimary30">
                      <td className="w-2/3 text-left">Renadyl™</td>
                      <td className="w-1/3 text-right">
                        {cartQuantity} x
                        {productData.onSale
                          ? productData.salePrice
                          : productData.price}{" "}
                        {productData.currency}
                      </td>
                    </tr>
                    <tr>
                      <td className="pt-2">{t("product-sale-economy")}</td>
                      <td className="pt-2 text-right">
                        {productData.price * cartQuantity -
                          productData.salePrice * cartQuantity}{" "}
                        {productData.currency}{" "}
                      </td>
                    </tr>
                    {cartQuantity >= productData.bundleQuantity ? (
                      <>
                        <tr>
                          <td className="">
                            {t("product-sale-economy-bundle")}
                          </td>
                          <td className=" text-right">
                            {cartQuantity *
                              (productData.bundlePercentage
                                ? parseInt(
                                    productData.onSale
                                      ? productData.salePrice
                                      : productData.price
                                  ) -
                                  (parseInt(
                                    productData.onSale
                                      ? productData.salePrice
                                      : productData.price
                                  ) *
                                    productData.bundleSaleValue) /
                                    100
                                : productData.bundleSaleValue)}{" "}
                            {productData.currency}{" "}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>

                <h3 className="w-full text-right text-2xl font-bold">Total</h3>
                <h3 className="w-full text-right text-2xl font-bold">
                  {cartQuantity *
                    (cartQuantity >= productData.bundleQuantity
                      ? productData.bundlePercentage
                        ? parseInt(
                            productData.onSale
                              ? productData.salePrice
                              : productData.price
                          ) -
                          (parseInt(
                            productData.onSale
                              ? productData.salePrice
                              : productData.price
                          ) *
                            productData.bundleSaleValue) /
                            100
                        : parseInt(
                            productData.onSale
                              ? productData.salePrice
                              : productData.price
                          ) - productData.bundleSaleValue
                      : parseInt(
                          productData.onSale
                            ? productData.salePrice
                            : productData.price
                        ))}
                  {/* {parseInt(cartQuantity) *
                    parseInt(
                      productData.onSale
                        ? productData.salePrice
                        : productData.price
                    )}{" "} */}{" "}
                  {productData.currency}
                </h3>
                <Link
                  href="/checkout"
                  locale={currentLocale}
                  className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3 mt-4"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 px-2">Coșul meu</h1>
            <div className="h-[200px] flex justify-center items-center content-center">
              <h2>Coșul este gol...</h2>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Cart;
