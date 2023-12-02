"use client";
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next-intl/link";

import { FaEyeSlash, FaEye } from "react-icons/fa6";
import SelectInput from "../../../SelectInput";

import { useDispatch, useSelector } from "react-redux";

import countriesData from "@/public/json/countriesData.json";
import Script from "next/script";
import { useRouter } from "next-intl/client";
import PhoneInput from "react-phone-input-2";
import { getSession, signIn } from "next-auth/react";
import { saveCheckoutData } from "@/redux/slices/cartSlice";

function CheckoutNotLoggedIn() {
  const router = useRouter();

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);
  console.log(checkoutData);
  const dispatch = useDispatch();

  const [orderTotal, setTotalOrder] = useState(0);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    rememberMe: "",
  });

  const handleChangeLoginDetails = (e) => {
    const { name, value } = e.target;
    const updatedLoginDetails = { ...loginDetails, [name]: value };
    setLoginDetails(updatedLoginDetails);
  };

  const [checkoutFormData, setcheckoutFormData] = useState({
    doctor: "",
    shipping: {
      type: "courier",
      shippingService: "",
      fname: "",
      lname: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      address: "",
      wantsAccount: false,
      password: "",
      rePassword: "",
      easybox: "",
    },
    billing: {
      sameAsShipping: true,
      pf: true,
      type: "",
      fname: "",
      lname: "",
      companyName: "",
      companyCif: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      address: "",
    },
    order: {
      productData: {
        currency: "",
        price: "",
        onSale: false,
        salePrice: "",
        salePercentage: false,
        saleValue: "",
      },
      shippingService: "",
      shippingCost: "",
      productsCost: "",
    },
    payment: "card",
  });

  const handlePhoneChange = (value, data, event, formattedValue) => {
    handleChangeFormDetails(event);
  };

  const handleChangeFormDetails = (e) => {
    const { name, value } = e.target;
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      const names = name.split(".");

      if (names.length === 1) {
        updatedData[names[0]] = value;
      } else if (names.length === 2) {
        updatedData[names[0]][names[1]] = value;
      } else if (names.length === 3) {
        updatedData[names[0]][names[1]][names[2]] = value;
      }

      return updatedData;
    });
  };

  const [countryCode, setCountryCode] = useState(null);

  const [shippingPrice, setShippingPrice] = useState(25);

  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(true);

  const t = useTranslations("Checkout");

  const [countryValue, setCountryValue] = useState("");
  const [countryKey, setCountryKey] = useState("");

  const [stateValue, setStateValue] = useState("");
  const [stateKey, setStateKey] = useState("");

  const [statesOfSelectedCountry, setStatesOfSelectedCountry] = useState([]);

  const [cityValue, setCityValue] = useState("");
  const [cityKey, setCityKey] = useState("");

  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState([]);

  const [countryBillingValue, setCountryBillingValue] = useState("");
  const [countryBillingKey, setCountryBillingKey] = useState("");

  const [stateBillingValue, setStateBillingValue] = useState("");
  const [stateBillingKey, setStateBillingKey] = useState("");

  const [statesOfSelectedCountryBilling, setStatesOfSelectedCountryBilling] =
    useState([]);

  const [cityBillingValue, setCityBillingValue] = useState("");
  const [cityBillingKey, setCityBillingKey] = useState("");

  const [citiesOfSelectedStateBilling, setCitiesOfSelectedStateBilling] =
    useState([]);

  const [roDeliveryType, setRoDeliveryType] = useState("courier");
  const [samedayLockerInstance, setSamedayLockerInstance] = useState(null);
  const [samedayLockerMsg, setSamedayLockerMsg] = useState(null);
  const [samedayLockerInstanceLoading, setSamedayLockerInstanceLoading] =
    useState(true);

  const [wantsAccount, setWantsAccount] = useState(false);

  const [billingDetailsAsShipping, setBillingDetailsAsShipping] =
    useState(true);
  const [billingDetailsPF, setBillingDetailsToPF] = useState(true);

  const countries = new Object();
  const states = new Object();

  countriesData.forEach((country) => {
    // const match = europeanCountries.find(
    //   (europeanCountry) => europeanCountry.countryShortCode === country.iso2
    // );

    // if (match) {
    //   // Adaugă țara la obiectul europeanCountriesData
    //   // Object.assign(europeanCountriesData, country);
    //   europeanCountriesData.push(country);
    // }

    countries[country.iso2] = country.name;
    states[country.iso2] = country.states;
  });

  const getIpCountry = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country_code);
  };

  useEffect(() => {
    getIpCountry();
  }, []);

  useEffect(() => {
    if (countryCode !== null) getProductData(countryCode);
  }, [countryCode]);

  useEffect(() => {
    const statesOfCountry = new Object();
    if (countryKey !== "") {
      states[countryKey].forEach((state) => {
        statesOfCountry[state.state_code] = state.name;
      });
      setStatesOfSelectedCountry(statesOfCountry);
    } else {
      setStatesOfSelectedCountry([]);
      setStateValue("");
      setStateKey("");
    }
  }, [countryValue, countryKey]);

  useEffect(() => {
    const citiesOfState = new Object();
    if (stateKey !== "") {
      states[countryKey].forEach((state) => {
        if (state.state_code === stateKey) {
          state.cities.forEach((city) => {
            citiesOfState[city.id] = city.name;
          });
        }
      });
      setCitiesOfSelectedState(citiesOfState);
    } else {
      setCitiesOfSelectedState([]);
      setCityValue("");
      setCityKey("");
    }
  }, [stateValue, stateKey]);

  useEffect(() => {
    const statesOfCountry = new Object();
    if (countryBillingKey !== "") {
      states[countryBillingKey].forEach((state) => {
        statesOfCountry[state.name] = state.name;
      });
      setStatesOfSelectedCountryBilling(statesOfCountry);
    } else {
      setStatesOfSelectedCountryBilling([]);
      setStateBillingValue("");
      setStateBillingKey("");
    }
  }, [countryBillingValue, countryBillingKey]);

  useEffect(() => {
    const citiesOfState = new Object();
    if (stateBillingKey !== "") {
      states[countryBillingKey].forEach((state) => {
        if (state.state_code === stateBillingKey) {
          state.cities.forEach((city) => {
            citiesOfState[city.id] = city.name;
          });
        }
      });
      setCitiesOfSelectedStateBilling(citiesOfState);
    } else {
      setCitiesOfSelectedStateBilling([]);
      setCityBillingValue("");
      setCityBillingKey("");
    }
  }, [stateBillingValue, stateBillingKey]);

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
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["wantsAccount"] = !wantsAccount;

      return updatedData;
    });
    setWantsAccount(!wantsAccount);
  };

  // const handleLoginSubmitButton = (e) => {
  //   e.preventDefault();
  //   console.log("S-a triggeruit Button login", e);
  //   // handleLogin(e);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await signIn("clientCredentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (!response?.error) {
      const session = await getSession();
      if (session?.user?.role !== "admin") {
        router.refresh();
      }
    }
  };

  const handleCountryChange = (key, value) => {
    setCountryValue(value);
    setCountryKey(key);

    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["country"] = value;

      return updatedData;
    });
  };
  const handleClearCountry = () => {
    setCountryValue("");
    setCountryKey("");

    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["country"] = "";

      return updatedData;
    });
    handleClearState();
  };

  const handleStateChange = (key, value) => {
    setStateValue(value);
    setStateKey(key);

    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["state"] = value;

      return updatedData;
    });
  };
  const handleClearState = () => {
    setStateValue("");
    setStateKey("");
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["state"] = "";

      return updatedData;
    });
  };

  const handleCityChange = (key, value) => {
    setCityValue(value);
    setCityKey(key);

    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["city"] = value;

      return updatedData;
    });
  };

  const handleCountryBillingChange = (key, value) => {
    setCountryBillingValue(value);
    setCountryBillingKey(key);
  };
  const handleStateBillingChange = (key, value) => {
    setStateBillingValue(value);
    setStateBillingKey(key);
  };
  const handleCityBillingChange = (key, value) => {
    setCityBillingValue(value);
    setCityBillingKey(key);
  };

  const changeDeliveryType = (type) => {
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["type"] = type;

      return updatedData;
    });

    setRoDeliveryType(type);
  };

  // SAMEDAY LOCKER FUNCTIONS START
  const initSamedayLocker = () => {
    const clientId = process.env.SAMEDAY_EASYBOX_PLUGIN_CLIENTID;
    const countryCode = "RO";
    const langCode = "ro";
    const apiUsername = process.env.SAMEDAY_API_PASSWORD;
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
    console.log("Sameday Easybox plugin response: ", msg);
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["shipping"]["easybox"] = msg;

      console.log(updatedData);

      return updatedData;
    });
    // RESPONSE {
    //     "lockerId": 1150,
    //     "name": "easybox Canal S",
    //     "address": "Str. Zorelelor, Nr. 45-47",
    //     "cityId": 9384,
    //     "city": "Constanta",
    //     "countyId": 15,
    //     "county": "Constanta",
    //     "supportedPayment": 1,
    //     "postalCode": "900553"
    // }

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
  // SAMEDAY LOCKER FUNCTIONS END

  const changeBillingDetailsAsShipping = (value) => {
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["billing"]["sameAsShipping"] = value;

      console.log(updatedData);

      return updatedData;
    });
    setBillingDetailsAsShipping(value);
  };

  const changeBillingDetailsToPF = (value) => {
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData["billing"]["pf"] = value;

      console.log(updatedData);

      return updatedData;
    });
    setBillingDetailsToPF(value);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const formData = {
      shipping: checkoutFormData.shipping,
      billing: checkoutFormData.billing,
      doctor: checkoutFormData.doctor,
      order: {
        shippingCost: shippingPrice,
        orderTotal: orderTotal,
      },
    };
    dispatch(saveCheckoutData(formData));
    router.push(`/checkout/summary`);
  };

  const handleChangePaymentMethod = (e) => {
    setcheckoutFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.payment = e.target.value;
      return updatedData;
    });
  };

  useEffect(() => {
    setTotalOrder(checkoutData.order.cartTotal + shippingPrice);
  }, [shippingPrice]);
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className="h-[200px] flex justify-center items-center content-center">
              <span class="loader"></span>
            </div>
          </>
        }
      >
        <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
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
              type="button"
              className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                isClient ? "text-backgroundPrimary" : "text-foregroundPrimary"
              }`}
            >
              {t("is-already-client")}
            </button>
            <button
              type="button"
              onClick={handleSetIsNotClient}
              className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                !isClient ? "text-backgroundPrimary" : "text-foregroundPrimary"
              }`}
            >
              {t("is-new-client")}
            </button>
          </div>
        </section>

        <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max overflow-hidden ">
          <div className="relative w-full flex flex-row  flex items-center content-center justify-center bg-backgroundPrimary p-1 z-10 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:z-0 before:from-gradientGreen before:to-gradientPurple ">
            <div className="relative z-10 p-6 bg-backgroundPrimary content-['']  rounded-lg w-full h-full ">
              <h2 className="text-center w-full">{t("promo-account")}</h2>
            </div>
          </div>
        </section>

        {isClient ? (
          <>
            <form onSubmit={handleLogin}>
              <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 mb-12 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
                <div className="p-8 bg-backgroundPrimary">
                  <h2 className="text-2xl">1. {t("section-2-1-title")}</h2>
                  <div className="w-full flex flex-col mb-2">
                    <label className="px-1 text-foregroundPrimary70">
                      {t("login-form.email-label")}
                    </label>
                    <input
                      placeholder={t("login-form.email-ph")}
                      type="email"
                      name="email"
                      value={loginDetails.email}
                      className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      onChange={handleChangeLoginDetails}
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
                        name="password"
                        value={loginDetails.password}
                        className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        onChange={handleChangeLoginDetails}
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
                    // onClick={handleLoginSubmitButton}
                    className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
                  >
                    {t("login-form.submit-btn")}
                  </button>
                </div>
              </section>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleCheckoutSubmit}>
              <section className="relative max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max overflow-hidden">
                <div className="p-8 bg-backgroundPrimary">
                  <h2 className="text-2xl">1. {t("section-1-title")}</h2>
                  <div className="w-full flex flex-col mb-2">
                    <label className="px-1 text-foregroundPrimary70">
                      {t("doctor-details.name-label")}
                    </label>
                    <input
                      placeholder={t("doctor-details.name-ph")}
                      type="text"
                      name="doctor"
                      onChange={handleChangeFormDetails}
                      value={checkoutFormData.doctor}
                      className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                    />
                  </div>
                </div>
              </section>
              <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max ">
                <div className="p-8 bg-backgroundPrimary rounded-xl">
                  <h2 className="text-2xl">2. {t("section-2-2-title")}</h2>

                  <div>
                    <div className="w-full flex flex-row gap-8 ">
                      <div className="w-1/2 flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("register-form.fname-label")}
                        </label>
                        <input
                          placeholder={t("register-form.fname-ph")}
                          type="text"
                          name="shipping.fname"
                          onChange={handleChangeFormDetails}
                          value={checkoutFormData.shipping.fname}
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        />
                      </div>
                      <div className="w-1/2 flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("register-form.lname-label")}
                        </label>
                        <input
                          placeholder={t("register-form.lname-ph")}
                          type="text"
                          name="shipping.lname"
                          onChange={handleChangeFormDetails}
                          value={checkoutFormData.shipping.lname}
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-row gap-8 ">
                      <div className="w-1/2 flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("register-form.phone-label")}
                        </label>

                        <PhoneInput
                          value={checkoutFormData.shipping.phone}
                          placeholder={t("register-form.phone-ph")}
                          onChange={handlePhoneChange}
                          inputProps={{
                            name: "shipping.phone",
                            required: true,
                            autoFocus: true,
                          }}
                          containerClass="w-full"
                          inputClass="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 w-full focus:border-foregroundPrimary py-1 px-1"
                          specialLabel=""
                        />
                      </div>
                      <div className="w-1/2 flex flex-col mb-2">
                        <label className="px-1 text-foregroundPrimary70">
                          {t("register-form.email-label")}
                        </label>
                        <input
                          placeholder={t("register-form.email-ph")}
                          type="email"
                          name="shipping.email"
                          onChange={handleChangeFormDetails}
                          value={checkoutFormData.shipping.email}
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl">
                        {t("register-form.want-account")}
                      </h3>
                      <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                        <div
                          className={`absolute w-1/2 top-0 "left-0" ${
                            wantsAccount
                              ? "translate-x-full bg-right rounded-l-lg"
                              : "translate-x-0 bg-left rounded-r-lg"
                          }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                        ></div>
                        <button
                          type="button"
                          className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                            wantsAccount
                              ? "text-foregroundPrimary"
                              : "text-backgroundPrimary"
                          }`}
                          onClick={() => handleWantsAccount(false)}
                        >
                          {t("register-form.wants-account-no")}
                        </button>
                        <button
                          type="button"
                          className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                            wantsAccount
                              ? "text-backgroundPrimary"
                              : "text-foregroundPrimary"
                          }`}
                          onClick={() => handleWantsAccount(true)}
                        >
                          {t("register-form.wants-account-yes")}
                        </button>
                      </div>

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
                                name="shipping.password"
                                onChange={handleChangeFormDetails}
                                value={checkoutFormData.shipping.password}
                                className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                              <button
                                onClick={handleNewPasswordVisibleClick}
                                type="button"
                                className="absolute right-0"
                              >
                                {newPasswordVisible ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
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
                                name="shipping.rePassword"
                                onChange={handleChangeFormDetails}
                                value={checkoutFormData.shipping.rePassword}
                                className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                              <button
                                onClick={handleNewPasswordVisibleClick}
                                type="button"
                                className="absolute right-0"
                              >
                                {newPasswordVisible ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl mt-4">
                    {t("shipping-form.shipping-method")}
                  </h3>
                  <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
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
                      onClick={() => changeDeliveryType("courier")}
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
                      onClick={() => changeDeliveryType("easybox")}
                    >
                      {t("shipping-form.shipping-type.easybox")}
                    </button>
                  </div>
                  {roDeliveryType === "easybox" ? (
                    <>
                      {samedayLockerInstanceLoading ? (
                        <></>
                      ) : (
                        <>
                          <div>
                            <label className="px-1 text-foregroundPrimary70">
                              {t("shipping-form.easybox.label")}
                            </label>
                            <button
                              type="button"
                              onClick={openSamedayLockerMap}
                              className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                            >
                              {t("shipping-form.easybox.button-text")}
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="w-full flex flex-row gap-8 ">
                          <div className="w-full flex flex-col mb-2">
                            <label className="px-1 text-foregroundPrimary70">
                              {t("shipping-form.country-label")}
                            </label>
                            <SelectInput
                              data={countries}
                              value={countryValue}
                              name={"shipping.country"}
                              onChange={handleCountryChange}
                              // onClear={handleClearCountry}
                              placeholder={t("shipping-form.country-ph")}
                              required={true}
                            />
                          </div>
                          <div className="w-full flex flex-col mb-2">
                            <label className="px-1 text-foregroundPrimary70">
                              {t("shipping-form.state-label")}
                            </label>
                            <SelectInput
                              data={statesOfSelectedCountry}
                              value={stateValue}
                              name={"shipping.state"}
                              onChange={handleStateChange}
                              // onClear={handleClearState}
                              placeholder={t("shipping-form.state-ph")}
                              disabled={statesOfSelectedCountry.length === 0}
                              required={statesOfSelectedCountry.length !== 0}
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-row gap-8 ">
                          <div className="w-full flex flex-col mb-2">
                            <label className="px-1 text-foregroundPrimary70">
                              {t("shipping-form.city-label")}
                            </label>
                            <SelectInput
                              data={citiesOfSelectedState}
                              value={cityValue}
                              name={"shipping.city"}
                              onChange={handleCityChange}
                              placeholder={t("shipping-form.city-ph")}
                              disabled={citiesOfSelectedState.length === 0}
                              required={citiesOfSelectedState.length !== 0}
                            />
                            {/* <input
                          placeholder={t("shipping-form.city-ph")}
                          type="text"
                          name="shipping-city"
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        /> */}
                          </div>
                          <div className="w-full flex flex-col mb-2">
                            <label className="px-1 text-foregroundPrimary70">
                              {t("shipping-form.postalcode-label")}
                            </label>
                            <input
                              placeholder={t("shipping-form.postalcode-ph")}
                              type="text"
                              name="shipping.postalCode"
                              onChange={handleChangeFormDetails}
                              value={checkoutFormData.shipping.postalCode}
                              className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                              required
                            />
                          </div>
                        </div>
                        <div className="w-full flex flex-col mb-2">
                          <label className="px-1 text-foregroundPrimary70">
                            {t("shipping-form.address-label")}
                          </label>
                          <input
                            placeholder={t("shipping-form.address-ph")}
                            type="text"
                            name="shipping.address"
                            onChange={handleChangeFormDetails}
                            value={checkoutFormData.shipping.address}
                            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </section>
              <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max">
                <div className="p-8 bg-backgroundPrimary rounded-xl">
                  <h2 className="text-2xl">3. {t("section-3-title")}</h2>

                  <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-6">
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
                      <label className=" px-1 text-foregroundPrimary70">
                        {t("billing-form.pf-or-pj-label")}
                      </label>
                      <div className="relative  w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                        <div
                          className={`absolute w-1/2 top-0 "left-0" ${
                            billingDetailsPF
                              ? "translate-x-0 bg-left rounded-r-lg"
                              : "translate-x-full bg-right rounded-l-lg"
                          }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                        ></div>
                        <button
                          type="button"
                          className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                            billingDetailsPF
                              ? "text-backgroundPrimary"
                              : "text-foregroundPrimary"
                          }`}
                          onClick={() => changeBillingDetailsToPF(true)}
                        >
                          {t("billing-form.pf")}
                        </button>
                        <button
                          type="button"
                          className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                            billingDetailsPF
                              ? "text-foregroundPrimary"
                              : "text-backgroundPrimary"
                          }`}
                          onClick={() => changeBillingDetailsToPF(false)}
                        >
                          {t("billing-form.pj")}
                        </button>
                      </div>
                      {billingDetailsPF ? (
                        <>
                          <div>
                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.fname-label")}
                                </label>
                                <input
                                  placeholder={t("billing-form.fname-ph")}
                                  type="text"
                                  name="billing.fname"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.fname}
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
                                  name="billing.lname"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.lname}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>

                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.phone-label")}
                                </label>
                                {/* <input
                                  placeholder={t("billing-form.phone-ph")}
                                  type="number"
                                  name="shipping-phone"
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                  required
                                /> */}

                                <PhoneInput
                                  value={checkoutFormData.billing.phone}
                                  placeholder={t("billing-form.phone-ph")}
                                  onChange={handlePhoneChange}
                                  inputProps={{
                                    name: "billing.phone",
                                    required: true,
                                    autoFocus: true,
                                  }}
                                  containerClass="w-full"
                                  inputClass="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 w-full focus:border-foregroundPrimary py-1 px-1"
                                  specialLabel=""
                                />
                              </div>
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.email-label")}
                                </label>
                                <input
                                  placeholder={t("billing-form.email-ph")}
                                  type="email"
                                  name="billing.email"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.email}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-row gap-8">
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
                                  {t("billing-form.state-label")}
                                </label>
                                <SelectInput
                                  data={statesOfSelectedCountryBilling}
                                  value={stateBillingValue}
                                  name={"billing-state"}
                                  onChange={handleStateBillingChange}
                                  placeholder={t("billing-form.state-ph")}
                                  disabled={
                                    statesOfSelectedCountryBilling.length === 0
                                  }
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.city-label")}
                                </label>
                                <SelectInput
                                  data={citiesOfSelectedStateBilling}
                                  value={cityBillingValue}
                                  name={"billing-city"}
                                  onChange={handleCityBillingChange}
                                  placeholder={t("billing-form.city-ph")}
                                  disabled={
                                    citiesOfSelectedStateBilling.length === 0
                                  }
                                />
                              </div>
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.postal-code-label")}
                                </label>
                                <input
                                  placeholder={t("billing-form.postal-code-ph")}
                                  type="text"
                                  name="billing.postalCode"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.postalCode}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.address-label")}
                              </label>
                              <input
                                placeholder={t("billing-form.address-ph")}
                                type="text"
                                name="billing.address"
                                onChange={handleChangeFormDetails}
                                value={checkoutFormData.billing.address}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.company-name-label")}
                                </label>
                                <input
                                  placeholder={t(
                                    "bililling-form.company-name-ph"
                                  )}
                                  type="text"
                                  name="billing.companyName"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.companyName}
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
                                  name="billing.companyCif"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.companyCif}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.phone-label")}
                                </label>
                                {/* <input
                                placeholder={t("billing-form.phone-ph")}
                                type="number"
                                name="shipping-phone"
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                required
                              /> */}
                                <PhoneInput
                                  value={checkoutFormData.billing.phone}
                                  placeholder={t("billing-form.phone-ph")}
                                  onChange={handlePhoneChange}
                                  inputProps={{
                                    name: "billing.phone",
                                    required: true,
                                    autoFocus: true,
                                  }}
                                  containerClass="w-full"
                                  inputClass="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 w-full focus:border-foregroundPrimary py-1 px-1"
                                  specialLabel=""
                                />
                              </div>
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.email-label")}
                                </label>
                                <input
                                  placeholder={t("billing-form.email-ph")}
                                  type="email"
                                  name="billing.email"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.email}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-row gap-8">
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
                                  {t("billing-form.state-label")}
                                </label>
                                <SelectInput
                                  data={statesOfSelectedCountryBilling}
                                  value={stateBillingValue}
                                  name={"billing-state"}
                                  onChange={handleStateBillingChange}
                                  placeholder={t("billing-form.state-ph")}
                                  disabled={
                                    statesOfSelectedCountryBilling.length === 0
                                  }
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-row gap-8">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.city-label")}
                                </label>
                                <SelectInput
                                  data={citiesOfSelectedStateBilling}
                                  value={cityBillingValue}
                                  name={"billing-city"}
                                  onChange={handleCityBillingChange}
                                  placeholder={t("billing-form.city-ph")}
                                  disabled={
                                    citiesOfSelectedStateBilling.length === 0
                                  }
                                />
                              </div>
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("billing-form.postal-code-label")}
                                </label>
                                <input
                                  placeholder={t("billing-form.postal-code-ph")}
                                  type="text"
                                  name="billing.postalCode"
                                  onChange={handleChangeFormDetails}
                                  value={checkoutFormData.billing.postalCode}
                                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                  required
                                />
                              </div>
                            </div>
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.address-label")}
                              </label>
                              <input
                                placeholder={t("billing-form.address-ph")}
                                type="text"
                                name="billing.address"
                                onChange={handleChangeFormDetails}
                                value={checkoutFormData.billing.address}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </section>
              <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max">
                <div className="p-8 bg-backgroundPrimary rounded-xl">
                  <h2 className="text-2xl">4. Metoda de plată</h2>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="payment-method"
                        checked={checkoutFormData.payment === "cash"}
                        value="cash"
                        onChange={handleChangePaymentMethod}
                        disabled
                      />
                      Cash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="payment-method"
                        value="card"
                        checked={checkoutFormData.payment === "card"}
                        onChange={handleChangePaymentMethod}
                      />
                      Card
                    </label>
                  </div>
                </div>
              </section>
              <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max">
                <div className="p-8 bg-backgroundPrimary rounded-xl">
                  <h2 className="text-2xl">Sumar comanda</h2>

                  <div className="flex flex-row mb-4 pb-2 border-b-[1px] border-b-foregroundPrimary20">
                    <div className="w-1/2 flex items-end">
                      <table className="w-full">
                        <tbody>
                          {cart.map((item) => (
                            <tr>
                              <td>
                                {item.productName === "renal_single"
                                  ? t("renal-single-short-name")
                                  : t("renal-bundle-short-name")}
                              </td>
                              <td>
                                {item.quantity} {t("product-unit")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="w-1/2">
                      <p className="text-right">
                        {t("total-products")}: {checkoutData.order.cartTotal}{" "}
                        {cart[0]?.currency}
                      </p>

                      <p className="text-right">
                        {t("total-products")}: {shippingPrice}{" "}
                        {cart[0]?.currency}
                      </p>
                      <h2 className="text-right text-2xl font-bold">
                        {t("total-order")}: {orderTotal} {cart[0]?.currency}
                      </h2>
                    </div>
                  </div>
                  <button
                    type="submit"
                    // onClick={handleFormSubmit}
                    className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                  >
                    {t("next-step-btn")}
                  </button>
                </div>
              </section>
            </form>
          </>
        )}

        <Script
          src="https://cdn.sameday.ro/locker-plugin/lockerpluginsdk.js"
          // strategy="beforeInteractive"
          onLoad={initSamedayLocker}
        />
      </Suspense>
    </>
  );
}

export default CheckoutNotLoggedIn;
