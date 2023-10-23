"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Link from "next-intl/link";

import { FaEyeSlash, FaEye } from "react-icons/fa6";
import SelectInput from "../SelectInput";

import { useSelector } from "react-redux";

import countriesData from "@/public/json/countriesData.json";
import Script from "next/script";

function Checkout() {
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

  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(true);

  const t = useTranslations("Checkout");

  const [countryValue, setCountryValue] = useState("");
  const [countryKey, setCountryKey] = useState("");

  const [regionValue, setRegionValue] = useState("");
  const [regionKey, setRegionKey] = useState("");

  const [regionsOfSelectedCountry, setRegionsOfSelectedCountry] = useState([]);

  const [countryBillingValue, setCountryBillingValue] = useState("");
  const [countryBillingKey, setCountryBillingKey] = useState("");

  const [regionBillingValue, setRegionBillingValue] = useState("");
  const [regionBillingKey, setRegionBillingKey] = useState("");

  const [regionsOfSelectedCountryBilling, setRegionsOfSelectedCountryBilling] =
    useState([]);

  const [roDeliveryType, setRoDeliveryType] = useState("courier");
  const [samedayLockerInstance, setSamedayLockerInstance] = useState(null);
  const [samedayLockerMsg, setSamedayLockerMsg] = useState(null);
  const [samedayLockerInstanceLoading, setSamedayLockerInstanceLoading] =
    useState(true);

  const [wantsAccount, setWantsAccount] = useState(false);

  const [billingDetailsAsShipping, setBillingDetailsAsShipping] =
    useState(true);

  const countries = new Object();
  const regions = new Object();
  countriesData.forEach((country) => {
    countries[country.countryShortCode] = country.countryName;
    regions[country.countryShortCode] = country.regions;
  });

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

  useEffect(() => {
    const regionsOfCountry = new Object();
    if (countryKey !== "") {
      regions[countryKey].forEach((region) => {
        regionsOfCountry[region.name] = region.name;
      });
      setRegionsOfSelectedCountry(regionsOfCountry);
    } else {
      setRegionsOfSelectedCountry([]);
      setRegionValue("");
      setRegionKey("");
    }
  }, [countryValue, countryKey]);

  useEffect(() => {
    const regionsOfCountry = new Object();
    if (countryBillingKey !== "") {
      regions[countryBillingKey].forEach((region) => {
        regionsOfCountry[region.name] = region.name;
      });
      setRegionsOfSelectedCountryBilling(regionsOfCountry);
    } else {
      setRegionsOfSelectedCountryBilling([]);
      setRegionBillingValue("");
      setRegionBillingKey("");
    }
  }, [countryBillingValue, countryBillingKey]);

  const handleSetIsClient = () => {
    setIsClient(true);
  };
  const handleSetIsNotClient = () => {
    setIsClient(false);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const handlePasswordVisibleClick = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };
  const handleNewPasswordVisibleClick = (event) => {
    event.preventDefault();
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleWantsAccount = (event) => {
    setWantsAccount(!wantsAccount);
  };

  const handleLogin = () => {};

  const handleCountryChange = (key, value) => {
    setCountryValue(value);
    setCountryKey(key);
  };
  const handleRegionChange = (key, value) => {
    setRegionValue(value);
    setRegionKey(key);
  };
  const handleCountryBillingChange = (key, value) => {
    setCountryBillingValue(value);
    setCountryBillingKey(key);
  };
  const handleRegionBillingChange = (key, value) => {
    setRegionBillingValue(value);
    setRegionBillingKey(key);
  };

  const changeRoDeliveryType = (type) => {
    setRoDeliveryType(type);
  };

  const initSamedayLocker = () => {
    const clientId = "null"; //each integrator will have an unique clientId
    const countryCode = "RO"; //country for which the plugin is used
    const langCode = "ro"; //language of the plugin
    const apiUsername = "myLmUsername"; //integrator LM Username
    window.LockerPlugin.init({
      clientId: clientId,
      countryCode: countryCode,
      langCode: langCode,
      apiUsername: apiUsername,
    });
    setSamedayLockerInstance(window.LockerPlugin.getInstance());
  };
  const handleSameDayLockerSelect = (msg) => {
    setSamedayLockerMsg(msg);

    samedayLockerInstance.close();
  };
  const openSamedayLockerMap = (event) => {
    event.preventDefault();
    if (samedayLockerInstance !== null) {
      samedayLockerInstance.subscribe(handleSameDayLockerSelect);
      samedayLockerInstance.open();
    }
  };

  useEffect(() => {
    if (samedayLockerInstance !== null) setSamedayLockerInstanceLoading(false);
  }, [samedayLockerInstance]);

  const changeBillingDetailsAsShipping = (value) => {
    setBillingDetailsAsShipping(value);
  };

  return (
    <>
      <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        <div className="p-8 bg-backgroundPrimary">
          <h2 className="text-2xl">1. Recomandare</h2>
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
        <div className="relative w-full flex flex-row bg-backgroundPrimary">
          <div
            className={`absolute w-1/2 top-0 left-0 ${
              isClient
                ? "translate-x-0 bg-left rounded-r-lg"
                : "translate-x-full bg-right rounded-l-lg"
            }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
          ></div>
          <button
            onClick={handleSetIsClient}
            className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
              isClient ? "text-backgroundPrimary" : "text-foregroundPrimary"
            }`}
          >
            Sunt deja client
          </button>
          <button
            onClick={handleSetIsNotClient}
            className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
              !isClient ? "text-backgroundPrimary" : "text-foregroundPrimary"
            }`}
          >
            Sunt client nou
          </button>
        </div>
      </section>
      {isLogedIn ? (
        ""
      ) : isClient ? (
        <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
          <div className="p-8 bg-backgroundPrimary">
            <h2 className="text-2xl">2. Autentificare</h2>
            <form onSubmit={handleLogin}>
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
          </div>
        </section>
      ) : (
        <>
          <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max ">
            <div className="p-8 bg-backgroundPrimary rounded-xl">
              <h2 className="text-2xl">2. Detalii de livrare</h2>

              <h3 className="text-xl">Modalitate de livrare</h3>
              <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden">
                <div
                  className={`absolute w-1/2 top-0 "left-0" ${
                    roDeliveryType !== "easybox"
                      ? "translate-x-0 bg-left rounded-r-lg"
                      : "translate-x-full bg-right rounded-l-lg"
                  }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                ></div>
                <button
                  type="button"
                  className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                    roDeliveryType === "easybox"
                      ? "text-foregroundPrimary"
                      : "text-backgroundPrimary"
                  }`}
                  onClick={() => changeRoDeliveryType("courier")}
                >
                  {t("shipping-form.shipping-type.courier")}
                </button>
                <button
                  type="button"
                  className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                    roDeliveryType === "easybox"
                      ? "text-backgroundPrimary"
                      : "text-foregroundPrimary"
                  }`}
                  onClick={() => changeRoDeliveryType("easybox")}
                >
                  {t("shipping-form.shipping-type.easybox")}
                </button>
              </div>

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
                            type={newPasswordVisible ? "text" : "password"}
                            name="lname"
                            className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                          <button
                            onClick={handleNewPasswordVisibleClick}
                            type="button"
                            className="absolute right-0"
                          >
                            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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
                            type={newPasswordVisible ? "text" : "password"}
                            name="lname"
                            className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                          <button
                            onClick={handleNewPasswordVisibleClick}
                            type="button"
                            className="absolute right-0"
                          >
                            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {roDeliveryType === "easybox" ? (
                <>
                  {samedayLockerInstanceLoading ? (
                    <></>
                  ) : (
                    <>
                      <div>
                        <label>Selectează locul de livrare</label>
                        <button
                          type="button"
                          onClick={openSamedayLockerMap}
                          className="block mt-4 bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                        >
                          Deschide harta
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div>
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
                </>
              )}
            </div>
          </section>
          <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max">
            <div className="p-8 bg-backgroundPrimary rounded-xl">
              <h2 className="text-2xl">3. {t("billing-form.billing-title")}</h2>

              <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden">
                <div
                  className={`absolute w-1/2 top-0 "left-0" ${
                    billingDetailsAsShipping
                      ? "translate-x-0 bg-left rounded-r-lg"
                      : "translate-x-full bg-right rounded-l-lg"
                  }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                ></div>
                <button
                  type="button"
                  className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                    billingDetailsAsShipping
                      ? "text-backgroundPrimary"
                      : "text-foregroundPrimary"
                  }`}
                  onClick={() => changeBillingDetailsAsShipping(true)}
                >
                  {t("billing-form.same-details-as-shipping")}
                </button>
                <button
                  type="button"
                  className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                    billingDetailsAsShipping
                      ? "text-foregroundPrimary"
                      : "text-backgroundPrimary"
                  }`}
                  onClick={() => changeBillingDetailsAsShipping(false)}
                >
                  {t("billing-form.new-details")}
                </button>
              </div>
              {billingDetailsAsShipping ? (
                <></>
              ) : (
                <>
                  <div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.fname-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.fname-ph")}
                        type="text"
                        name="fname"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.lname-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.lname-ph")}
                        type="text"
                        name="lname"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.cui-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.cui-ph")}
                        type="text"
                        name="cui"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.phone-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.phone-ph")}
                        type="number"
                        name="shipping-phone"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.email-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.email-ph")}
                        type="email"
                        name="lname"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.country-label")}
                      </label>
                      <SelectInput
                        data={countries}
                        value={countryBillingValue}
                        name={"billing-country"}
                        onChange={handleCountryBillingChange}
                        placeholder={t("billing-form.country-ph")}
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.region-label")}
                      </label>
                      <SelectInput
                        data={regionsOfSelectedCountryBilling}
                        value={regionBillingValue}
                        name={"billing-region"}
                        onChange={handleRegionBillingChange}
                        placeholder={t("billing-form.region-ph")}
                        disabled={regionsOfSelectedCountryBilling.length === 0}
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.city-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.city-ph")}
                        type="text"
                        name="billing-city"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col mb-2">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("billing-form.address-label")}
                      </label>
                      <input
                        placeholder={t("billing-form.address-ph")}
                        type="text"
                        name="billing-address"
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}

      <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 mb-12 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
        <div className="p-8 bg-backgroundPrimary">
          <h2 className="text-2xl">
            {isClient ? "3." : "4."} {t("summary.title")}
          </h2>

          {productDetailsLoading ? (
            <></>
          ) : (
            <>
              <div className="flex flex-row gap-12">
                <div className="w-2/3 border-r-[1px] border-foregroundPrimary20 pr-8">
                  <table className="w-full ">
                    <tbody className="w-full">
                      <tr>
                        <td className="text-left">
                          {t("summary.total-products")}:
                        </td>
                        <td className="text-right">
                          {cartQuantity *
                            (productData.onSale
                              ? productData.salePrice
                              : productData.price)}{" "}
                          {productData.currency}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left">
                          {t("summary.total-shipping")}:
                        </td>
                        <td className="text-right">
                          {shippingPrice} {productData.currency}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-1/3">
                  <h3 className="text-xl font-bold">
                    {t("summary.total-order")}:
                  </h3>
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
                  <button
                    disabled={true}
                    className="block mt-4 bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                  >
                    {t("summary.place-order")}
                  </button>
                </div>
              </div>
              <Script
                src="https://cdn.sameday.ro/locker-plugin/lockerpluginsdk.js"
                // strategy="beforeInteractive"
                onLoad={initSamedayLocker}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Checkout;
