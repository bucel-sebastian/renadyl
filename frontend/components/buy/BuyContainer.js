"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import productImg from "@/public/images/product_image_1.png";

import { FaEye, FaEyeSlash, FaMinus, FaPlus } from "react-icons/fa";

import countriesData from "@/public/json/countriesData.json";
import SelectInput from "../SelectInput";

function BuyContainer() {
  // Start - Inputs

  const [promocodeValue, setPromocodeValue] = useState("");

  // END - Inputs

  const [countryCode, setCountryCode] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [shippingServices, setShippingServices] = useState(null);
  const [internalShipping, setInternalShipping] = useState(true);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const [countryValue, setCountryValue] = useState("");
  const [countryKey, setCountryKey] = useState("");

  const [regionValue, setRegionValue] = useState("");
  const [regionKey, setRegionKey] = useState("");

  const [regionsOfSelectedCountry, setRegionsOfSelectedCountry] = useState([]);

  const [countryValueBilling, setCountryValueBilling] = useState("");
  const [countryKeyBilling, setCountryKeyBilling] = useState("");

  const [regionValueBilling, setRegionValueBilling] = useState("");
  const [regionKeyBilling, setRegionKeyBilling] = useState("");

  const [regionsOfSelectedCountryBilling, setRegionsOfSelectedCountryBilling] =
    useState([]);

  const [wantsAccount, setWantsAccount] = useState(false);

  const countries = new Object();
  const regions = new Object();

  countriesData.forEach((country) => {
    countries[country.countryShortCode] = country.countryName;
    regions[country.countryShortCode] = country.regions;
  });

  const [productData, setProductData] = useState({
    currency: "",
    price: "",
    onSale: false,
    salePrice: "",
    salePercentage: false,
    saleValue: "",
  });
  const [productQuantity, setProductQuantity] = useState(1);

  const [promoCodes, setPromoCodes] = useState([]);

  const [addNewPromocodeStatus, setAddNewPromocodeStatus] = useState(null);

  const [productsTotal, setProductsTotal] = useState(
    productData.onSale
      ? productData.salePrice * productQuantity
      : productData.price * productQuantity
  );
  const [shippingTotal, setShippingTotal] = useState(0);

  const calculateTotalWithPromo = (totalWithoutPromo) => {
    let newTotal = parseInt(totalWithoutPromo);
    if (promoCodes.length > 0) {
      promoCodes.forEach((code) => {
        let reduceValue = 0;
        if (code.percent) {
          reduceValue = totalWithoutPromo * (code.value / 100);
        } else {
          reduceValue = code.value;
        }

        newTotal = newTotal - reduceValue;
      });
    }
    return newTotal;
  };

  const [orderTotal, setOrderTotal] = useState(
    promoCodes.length > 0
      ? calculateTotalWithPromo(productsTotal + shippingTotal)
      : productsTotal + shippingTotal
  );

  const t = useTranslations("Buy");

  const handleRemoveProductQuantity = () => {
    if (productQuantity - 1 >= 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleAddProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const handleChangeProductQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    setProductQuantity(newQuantity);
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
    });
  };

  const handleAlreadyClientBtn = () => {
    setIsClient(true);
  };

  const handleNewClientBtn = () => {
    setIsClient(false);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibleClick = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {};

  const handleCountryChange = (key, value) => {
    setCountryKey(key);
    setCountryValue(value);
  };

  const handleRegionChange = (key, value) => {
    setRegionKey(key);
    setRegionValue(key);
  };

  const handleCountryChangeBilling = (key, value) => {
    setCountryKeyBilling(key);
    setCountryValueBilling(value);
  };

  const handleRegionChangeBilling = (key, value) => {
    setRegionKeyBilling(key);
    setRegionValueBilling(key);
  };

  const handleBillingSameAsShipping = (event) => {
    setBillingSameAsShipping(event.currentTarget.value);
  };

  useEffect(() => {
    getIpCountry();
  }, []);

  useEffect(() => {
    if (countryCode !== null) getProductData(countryCode);
  }, [countryCode]);

  useEffect(() => {
    const regionsOfCountry = new Object();
    if (countryKey !== "") {
      regions[countryKey].forEach((region) => {
        regionsOfCountry[region.name] = region.name;
      });
      setRegionsOfSelectedCountry(regionsOfCountry);

      if (countryKey === "RO") {
        setInternalShipping(true);
        setShippingServices("SMD");
      } else {
        setInternalShipping(false);
        setShippingServices(null);
      }
    } else {
      setRegionsOfSelectedCountry([]);
    }
  }, [countryKey, countryValue]);

  useEffect(() => {
    const regionsOfCountry = new Object();
    if (countryKeyBilling !== "") {
      regions[countryKeyBilling].forEach((region) => {
        regionsOfCountry[region.name] = region.name;
      });
      setRegionsOfSelectedCountryBilling(regionsOfCountry);

      if (countryKeyBilling === "RO") {
        setInternalShipping(true);
        setShippingServices("SMD");
      } else {
        setInternalShipping(false);
        setShippingServices(null);
      }
    } else {
      setRegionsOfSelectedCountryBilling([]);
    }
  }, [countryKeyBilling, countryValueBilling]);

  useEffect(() => {
    if (productData.price) {
      setProductsTotal(
        productData.onSale
          ? productData.salePrice * productQuantity
          : productData.price * productQuantity
      );
      setOrderTotal(
        promoCodes.length > 0
          ? calculateTotalWithPromo(productsTotal + shippingTotal)
          : productsTotal + shippingTotal
      );
    }
  }, [productQuantity, productData, productsTotal, promoCodes, shippingTotal]);

  const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);
  const [productDetailsLoading, setProductDetailsLoading] = useState(true);

  useEffect(() => {
    if (orderTotal !== 0) {
      setOrderDetailsLoading(false);
    }
  }, [orderTotal]);

  useEffect(() => {
    if (productData.price) {
      setProductDetailsLoading(false);
    }
  }, [productData]);

  const handlePromocodeValueInput = (event) => {
    setPromocodeValue(event.target.value);
  };

  const handleAddPromocode = async (event) => {
    event.preventDefault();
    if (promocodeValue !== "") {
      setPromocodeValue("");
    }
  };

  const handleWantsAccount = (event) => {
    setWantsAccount(!wantsAccount);
  };

  return (
    <>
      <section className="max-w-[1200px] w-full mx-auto px-4 max-md:px-2">
        <div className="flex flex-row max-md:flex-col">
          <div className="w-1/3 p-6 max-md:p-0 max-md:w-full max-md:mx-auto max-md:max-w-[300px]">
            <Image
              src={productImg}
              width={800}
              height={800}
              alt="Renadyl™"
              priority={true}
            />
          </div>
          <div className="w-2/3 p-8 max-md:px-0 max-md:w-full">
            <h2 className="text-2xl text-bold">{t("product-name")}</h2>
            <p>{t("product-desc")}</p>
            {productDetailsLoading ? (
              <div className="py-8">
                <h2 className="text-2xl text-left">
                  {t("product-details-loading")}
                </h2>
              </div>
            ) : (
              <>
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
                      onClick={handleRemoveProductQuantity}
                      className="w-1/3 bg-backgroundPrimary hover:bg-gradientPurple hover:text-backgroundPrimary transition-all flex justify-center items-center content-center h-full"
                      disabled={productQuantity === 1}
                    >
                      <FaMinus />
                    </button>
                    <input
                      className="w-1/3 text-center h-full [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      value={productQuantity}
                      min={1}
                      onChange={handleChangeProductQuantity}
                    />
                    <button
                      onClick={handleAddProductQuantity}
                      className="w-1/3 bg-backgroundPrimary flex justify-center items-center content-center h-full hover:bg-gradientPurple hover:text-backgroundPrimary transition-all"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="mb-[1px]">{t("total-products-value")}:</span>
                  &nbsp;
                  <span>
                    {productData.onSale
                      ? productData.salePrice * productQuantity
                      : productData.price * productQuantity}{" "}
                    {productData.currency}
                  </span>
                  {productData.onSale ? (
                    <p>
                      {t("product-sale-economy")}{" "}
                      {productData.price * productQuantity -
                        productData.salePrice * productQuantity}{" "}
                      {productData.currency}{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        <div className="p-8 bg-backgroundPrimary">
          <h2 className="text-2xl">Recomandare</h2>
          <div className="w-full flex flex-col mb-2">
            <label className="px-1 text-foregroundPrimary70">
              {t("doctor-details.name-label")}
            </label>
            <input
              placeholder={t("doctor-details.name-ph")}
              type="email"
              name="lname"
              className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
              required
            />
          </div>
        </div>
      </section>
      <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <div>
              <button
                className={`w-1/2 py-4 ${
                  isClient ? "bg-backgroundPrimary" : ""
                }`}
                type="button"
                onClick={handleAlreadyClientBtn}
              >
                Sunt deja client
              </button>
              <button
                className={`w-1/2 py-4 ${
                  !isClient ? "bg-backgroundPrimary" : ""
                }`}
                onClick={handleNewClientBtn}
              >
                Sunt client nou
              </button>
            </div>

            <div className="p-8 bg-backgroundPrimary">
              {isClient ? (
                <>
                  <div className="max-w-[600px] mx-auto ">
                    <form
                      onSubmit={handleLogin}
                      className="min-w-[400px] max-sm:min-w-0 mt-2"
                    >
                      <div className="w-full flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("login-form.email-label")}
                        </label>
                        <input
                          placeholder={t("login-form.email-ph")}
                          type="email"
                          name="lname"
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        />
                      </div>
                      <div className="w-full flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("login-form.password-label")}
                        </label>
                        <div className="relative flex flex-row items-center content-center">
                          <input
                            placeholder={t("login-form.password-ph")}
                            type={passwordVisible ? "text" : "password"}
                            name="lname"
                            className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                          <button
                            onClick={handlePasswordVisibleClick}
                            type="button"
                            className="absolute right-0"
                          >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <Link href="/lost-password">
                          {t("login-form.password-forgot-link")}
                        </Link>
                      </div>
                      <div className="flex flex-row items-center content-center gap-3  mb-2">
                        <input
                          type="checkbox"
                          name="remember-me"
                          id="login-remember-me"
                        />
                        <label htmlFor="login-remember-me">
                          {t("login-form.remember-label")}
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
                      >
                        {t("login-form.submit-btn")}
                      </button>
                    </form>
                    <div className="mt-4">
                      <p className="text-center">
                        {t("login-form.other-options")}
                      </p>
                      <div className="flex flex-row gap-5 justify-center mt-2">
                        <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>

                        <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>

                        <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full flex flex-row max-sm:flex-col gap-8">
                    <div className="w-1/2 max-sm:w-full">
                      <h2 className="text-2xl">
                        {t("shipping-form.shipping-title")}
                      </h2>
                      <p>{t("shipping-form.shipping-desc")}</p>
                      <div>
                        {/* detalii cont */}

                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.fname-label")}
                          </label>
                          <input
                            placeholder={t("register-form.fname-ph")}
                            type="text"
                            name="fname"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.lname-label")}
                          </label>
                          <input
                            placeholder={t("register-form.lname-ph")}
                            type="text"
                            name="lname"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.phone-label")}
                          </label>
                          <input
                            placeholder={t("register-form.phone-ph")}
                            type="number"
                            name="shipping-phone"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.email-label")}
                          </label>
                          <input
                            placeholder={t("register-form.email-ph")}
                            type="email"
                            name="lname"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                      </div>
                      <div>
                        {/* detalii livrare */}
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("shipping-form.country-label")}
                          </label>
                          <SelectInput
                            data={countries}
                            value={countryValue}
                            name={"shipping-country"}
                            onChange={handleCountryChange}
                            placeholder={t("shipping-form.country-ph")}
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("shipping-form.region-label")}
                          </label>
                          <SelectInput
                            data={regionsOfSelectedCountry}
                            value={regionValue}
                            name={"shipping-region"}
                            onChange={handleRegionChange}
                            placeholder={t("shipping-form.region-ph")}
                            disabled={regionsOfSelectedCountry.length === 0}
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("shipping-form.city-label")}
                          </label>
                          <input
                            placeholder={t("shipping-form.city-ph")}
                            type="text"
                            name="shipping-city"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("shipping-form.address-label")}
                          </label>
                          <input
                            placeholder={t("shipping-form.address-ph")}
                            type="text"
                            name="shipping-address"
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 max-sm:w-full">
                      <div>
                        {/* detalii facturare */}

                        <h2 className="text-2xl">
                          {t("billing-form.billing-title")}
                        </h2>
                        <div className="flex flex-col">
                          <label className="px-1 text-foregroundPrimary70">
                            <input
                              name="billing-same-as-shipping"
                              value={true}
                              type="radio"
                              checked={String(billingSameAsShipping) === "true"}
                              onChange={handleBillingSameAsShipping}
                              className="mr-2"
                            />
                            {t("billing-form.billing-same-as-shipping-label")}
                          </label>
                          <label className="px-1 text-foregroundPrimary70">
                            <input
                              name="billing-same-as-shipping"
                              value={false}
                              type="radio"
                              checked={
                                String(billingSameAsShipping) === "false"
                              }
                              onChange={handleBillingSameAsShipping}
                              className="mr-2"
                            />
                            {t("billing-form.new-billing-details-label")}
                          </label>
                        </div>

                        {String(billingSameAsShipping) === "true" ? (
                          ""
                        ) : (
                          <div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("register-form.fname-label")}
                              </label>
                              <input
                                placeholder={t("register-form.fname-ph")}
                                type="text"
                                name="fname"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("register-form.lname-label")}
                              </label>
                              <input
                                placeholder={t("register-form.lname-ph")}
                                type="text"
                                name="lname"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("register-form.phone-label")}
                              </label>
                              <input
                                placeholder={t("register-form.phone-ph")}
                                type="number"
                                name="billing-phone"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                required
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("register-form.email-label")}
                              </label>
                              <input
                                placeholder={t("register-form.email-ph")}
                                type="email"
                                name="lname"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.country-label")}
                              </label>
                              <SelectInput
                                data={countries}
                                value={countryValueBilling}
                                name={"shipping-country"}
                                onChange={handleCountryChangeBilling}
                                placeholder={t("shipping-form.country-ph")}
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.region-label")}
                              </label>
                              <SelectInput
                                data={regionsOfSelectedCountryBilling}
                                value={regionValueBilling}
                                name={"shipping-region"}
                                onChange={handleRegionChangeBilling}
                                placeholder={t("shipping-form.region-ph")}
                                disabled={
                                  regionsOfSelectedCountryBilling.length === 0
                                }
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.city-label")}
                              </label>
                              <input
                                placeholder={t("shipping-form.city-ph")}
                                type="text"
                                name="shipping-city"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.address-label")}
                              </label>
                              <input
                                placeholder={t("shipping-form.address-ph")}
                                type="text"
                                name="shipping-address"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className=" flex flex-row gap-2 items-center content-center">
                      <input
                        type="checkbox"
                        name="wants-account"
                        onChange={handleWantsAccount}
                        checked={wantsAccount}
                      />
                      {t("register-form.want-account")}
                    </label>

                    {wantsAccount ? (
                      <div className="flex flex-row gap-8 max-sm:flex-col max-sm:gap-2">
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.password-label")}
                          </label>
                          <div className="relative flex flex-row items-center content-center">
                            <input
                              placeholder={t("register-form.password-ph")}
                              type={passwordVisible ? "text" : "password"}
                              name="lname"
                              className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                              required
                            />
                            <button
                              onClick={handlePasswordVisibleClick}
                              type="button"
                              className="absolute right-0"
                            >
                              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("register-form.re-password-label")}
                          </label>
                          <div className="relative flex flex-row items-center content-center">
                            <input
                              placeholder={t("register-form.re-password-ph")}
                              type={passwordVisible ? "text" : "password"}
                              name="lname"
                              className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                              required
                            />
                            <button
                              onClick={handlePasswordVisibleClick}
                              type="button"
                              className="absolute right-0"
                            >
                              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </section>
      {/* <section className="relative max-w-[1200px] mt-8 w-full mx-auto border-foregroundSecondary20 border-[1px] shadow-lg rounded-xl h-[200px] overflow-hidden">
        <div> alte informatii </div>
      </section> */}

      <section className="relative max-w-[1200px] mt-8 mb-8 w-full mx-auto border-foregroundSecondary20 border-[1px] shadow-lg rounded-xl  overflow-hidden">
        {orderDetailsLoading ? (
          <div className="p-8 bg-backgroundPrimary">
            <h2 className="text-2xl text-center">
              {t("order-details.loading")}
            </h2>
          </div>
        ) : (
          <div className="p-8 bg-backgroundPrimary">
            <h2 className="text-2xl">{t("order-details.title")}</h2>
            <div className="mb-4">
              <div className="border-y-[1px] border-foregroundPrimary py-2 flex flex-row justify-between">
                <h3>
                  {t("product-name")} x {productQuantity} {t("product-unit")}
                </h3>
                <span>
                  {productsTotal} {productData.currency}
                </span>
              </div>
            </div>
            {/* <div>
              {promoCodes.length > 0
                ? promoCodes.map((promocode) => (
                    <div>
                      <span>{promocode.code}</span>
                      <span>
                        {promocode.value}{" "}
                        {promocode.percent ? "%" : promocode.currency}
                      </span>
                    </div>
                  ))
                : ""}
            </div> */}
            {/* <div>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("order-details.promo-code.input-label")}
                </label>
                <div className="flex flex-row">
                  <input
                    placeholder={t("order-details.promo-code.input-ph")}
                    type="text"
                    name="shipping-address"
                    className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 w-5/6 "
                    value={promocodeValue}
                    onChange={handlePromocodeValueInput}
                  />
                  <button
                    type="button"
                    className="w-1/6"
                    onClick={handleAddPromocode}
                  >
                    {t("order-details.promo-code.apply-btn")}
                  </button>
                </div>
              </div>
            </div> */}
            <div>
              <p className="text-right">
                {t("order-details.products-total")}: {productsTotal}{" "}
                {productData.currency}
              </p>
              <p className="text-right">
                {t("order-details.shipping-total")}: {shippingTotal}{" "}
                {productData.currency}
              </p>
              {promoCodes.length > 0 ? (
                <p className="text-right">
                  {t("order-details.promo-total")}: -
                  {productsTotal +
                    shippingTotal -
                    calculateTotalWithPromo(productsTotal + shippingTotal)}{" "}
                  {productData.currency}
                </p>
              ) : (
                ""
              )}
              <h1 className="text-3xl font-bold text-right">
                {t("order-details.order-total")}: {orderTotal}{" "}
                {productData.currency}
              </h1>
            </div>
            <div>
              <label className="flex flex-row justify-center items-center content-center mb-2 gap-2">
                <input type="checkbox" name="tc" /> {t("order-details.tc")}
              </label>
              <button
                className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen max-w-[500px] bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
                disabled
              >
                {t("order-details.place-order-btn")}
              </button>
              <p className="text-[#ff0000] font-bold text-center mt-4">
                Momentan nu se pot plasa comenzi deoarece această
                funcționalitate este încă în dezvoltare
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default BuyContainer;
