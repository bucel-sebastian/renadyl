"use client";
import { Link, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { updateCheckoutData } from "@/redux/slices/cartSlice";
import PhoneInput from "react-phone-input-2";
import SelectInput from "@/components/SelectInput";
import { getSession, signIn } from "next-auth/react";

import countriesData from "@/public/json/countriesData.json";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useRouter } from "next-intl/client";

function CheckoutNotLoggedIn({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("Checkout");

  const { cart } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    router.replace("/cart", { locale: locale });
  }

  const { checkoutData } = useSelector((state) => state.cart);

  const [summaryData, setSummaryData] = useState({
    orderTotal: 0,
    productsTotal: 0,
    productsSaleTotal: 0,
    promoTotal: 0,
    shippingTotal: 0,
    vatProcent: 0,
    vatTotal: 0,
  });

  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(true);

  const [esxistsAccountWithEmail, setExistsAccountWithEmail] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSetIsClient = () => {
    setIsClient(true);
  };
  const handleSetIsNotClient = () => {
    setIsClient(false);
  };

  //   Login - Start

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    rememberMe: "",
  });

  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const handleLoginPasswordVisibleClick = (e) => {
    e.preventDefault();
    setLoginPasswordVisible(!loginPasswordVisible);
  };

  const handleChangeLoginDetails = (e) => {
    const { name, value } = e.target;
    const updatedLoginDetails = { ...loginDetails, [name]: value };
    setLoginDetails(updatedLoginDetails);
  };

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
  //    Login - End

  const handleChangeCheckoutData = (e) => {
    const { name, value } = e.target;
    dispatch(updateCheckoutData({ name: name, value: value }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    handleChangeCheckoutData(event);
  };

  const handleWantsAccount = (value) => {
    dispatch(
      updateCheckoutData({ name: "shipping.wantsAccount", value: value })
    );
  };

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const handleNewPasswordVisibleClick = (e) => {
    e.preventDefault();
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    console.log("merge");
    router.push("/checkout/summary", { locale: locale });
  };

  const calculateCartSummary = async () => {
    const requestBody = {
      cart: cart,
      checkoutData: checkoutData,
    };

    const response = await fetch(
      "/api/data/json/checkout/calculate-order-total",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();

    console.log("summary data - ", data.body);
    setSummaryData(data.body);
  };

  const checkShippingEmailInput = async () => {
    const emailValue = checkoutData?.shipping?.email;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
      console.log("Email valid:", emailValue);

      const response = await fetch(
        `/api/data/json/checkout/check-if-email-exists/${emailValue}`
      );

      const body = await response.json();

      setExistsAccountWithEmail(body.body);
      console.log("email response - ", body.body);
    } else {
      setExistsAccountWithEmail(false);
    }
  };

  useEffect(() => {
    dispatch(updateCheckoutData({ name: "shipping.rePassword", value: "" }));
    dispatch(updateCheckoutData({ name: "shipping.password", value: "" }));
    dispatch(updateCheckoutData({ name: "shipping.save", value: false }));
    dispatch(updateCheckoutData({ name: "shipping.savedData", value: null }));
    dispatch(updateCheckoutData({ name: "billing.save", value: false }));
    dispatch(updateCheckoutData({ name: "billing.savedData", value: null }));

    checkShippingEmailInput();

    if (window?.location?.hash) {
      console.log("Has #");
      handleSetIsNotClient();
      setTimeout(() => {
        const elementId = window?.location?.hash.substring(1); // Remove the '#' character
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView();
        }
      }, 100);
    }
  }, []);

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

  const handleCountryChange = (key, value) => {
    dispatch(updateCheckoutData({ name: "shipping.country", value: value }));
    dispatch(updateCheckoutData({ name: "shipping.countryKey", value: key }));
    dispatch(updateCheckoutData({ name: "shipping.type", value: "courier" }));
  };

  const changeDeliveryType = (type) => {
    dispatch(updateCheckoutData({ name: "shipping.type", value: type }));
  };

  //   Sameday locker functions - Start

  const [samedayLockerInstance, setSamedayLockerInstance] = useState(null);
  const [samedayLockerMsg, setSamedayLockerMsg] = useState(null);
  const [samedayLockerInstanceLoading, setSamedayLockerInstanceLoading] =
    useState(true);

  const initSamedayLocker = () => {
    const clientId = process.env.NEXT_PUBLIC_SAMEDAY_EASYBOX_PLUGIN_CLIENTID;
    const countryCode = "RO";
    const langCode = "ro";
    const apiUsername = process.env.NEXT_PUBLIC_SAMEDAY_API_USERNAME;
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

    dispatch(updateCheckoutData({ name: "shipping.locker", value: msg }));
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
  //   Sameday locker functions - End

  const calculateShippingPrice = async (
    paymentMethod,
    shippingType,
    currency
  ) => {
    // const response = await fetch(
    //   `/api/data/sameday/estimate-cost/?paymentMethod=${paymentMethod}&shippingType=${shippingType}&currency=${currency}`
    // );
    // const body = await response.json();
    // console.log("Response from backend ", body.body.amount);
    // dispatch(
    //   updateCheckoutData({
    //     name: "order.shippingPrice",
    //     value: body.body.amount,
    //   })
    // );
  };

  const [statesOfSelectedCountry, setStatesOfSelectedCountry] = useState([]);
  useEffect(() => {
    const statesOfCountry = new Object();
    if (
      checkoutData.shipping.countryKey &&
      checkoutData.shipping.countryKey !== ""
    ) {
      states[checkoutData?.shipping?.countryKey].forEach((state) => {
        statesOfCountry[state.state_code] = state.name;
      });
      setStatesOfSelectedCountry(statesOfCountry);
    } else {
      setStatesOfSelectedCountry([]);
      handleStateChange("", "");
    }
  }, [checkoutData?.shipping?.country, checkoutData?.shipping?.countryKey]);

  const handleStateChange = (key, value) => {
    console.log("State change ", value, key);
    dispatch(updateCheckoutData({ name: "shipping.state", value: value }));
    dispatch(updateCheckoutData({ name: "shipping.stateKey", value: key }));
  };

  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState([]);
  useEffect(() => {
    const citiesOfState = new Object();
    if (
      checkoutData.shipping.stateKey &&
      checkoutData.shipping.stateKey !== ""
    ) {
      states[checkoutData.shipping.countryKey].forEach((state) => {
        if (state.state_code === checkoutData?.shipping?.stateKey) {
          state.cities.forEach((city) => {
            citiesOfState[city.id] = city.name;
          });
        }
      });
      setCitiesOfSelectedState(citiesOfState);
    } else {
      setCitiesOfSelectedState([]);
      handleCityChange("", "");
    }
  }, [checkoutData?.shipping?.state, checkoutData?.shipping?.stateKey]);

  const handleCityChange = (key, value) => {
    dispatch(updateCheckoutData({ name: "shipping.city", value: value }));
    dispatch(updateCheckoutData({ name: "shipping.cityKey", value: key }));
  };

  const changeBillingDetailsAsShipping = (value) => {
    dispatch(updateCheckoutData({ name: "billing.asShipping", value: value }));
  };

  const changeBillingDetailsToPF = (value) => {
    dispatch(updateCheckoutData({ name: "billing.entity", value: value }));
  };

  const handleCountryBillingChange = (key, value) => {
    dispatch(updateCheckoutData({ name: "billing.country", value: value }));
    dispatch(updateCheckoutData({ name: "billing.countryKey", value: key }));
  };

  const [statesOfSelectedCountryBilling, setStatesOfSelectedCountryBilling] =
    useState([]);
  useEffect(() => {
    const statesOfCountry = new Object();
    if (
      checkoutData.billing.countryKey &&
      checkoutData?.billing?.countryKey !== ""
    ) {
      states[checkoutData?.billing?.countryKey].forEach((state) => {
        statesOfCountry[state.state_code] = state.name;
      });
      setStatesOfSelectedCountryBilling(statesOfCountry);
    } else {
      setStatesOfSelectedCountryBilling([]);
      handleStateBillingChange("", "");
    }
  }, [checkoutData?.billing?.country, checkoutData?.billing?.countryKey]);

  const handleStateBillingChange = (key, value) => {
    dispatch(updateCheckoutData({ name: "billing.state", value: value }));
    dispatch(updateCheckoutData({ name: "billing.stateKey", value: key }));
  };

  const [citiesOfSelectedStateBilling, setCitiesOfSelectedStateBilling] =
    useState([]);
  useEffect(() => {
    const citiesOfState = new Object();
    if (
      checkoutData.billing.stateKey &&
      checkoutData?.billing?.stateKey !== ""
    ) {
      states[checkoutData?.billing?.countryKey].forEach((state) => {
        if (state.state_code === checkoutData?.billing?.stateKey) {
          state.cities.forEach((city) => {
            citiesOfState[city.id] = city.name;
          });
        }
      });
      setCitiesOfSelectedStateBilling(citiesOfState);
    } else {
      setCitiesOfSelectedStateBilling([]);
      handleStateBillingChange("", "");
    }
  }, [checkoutData?.billing?.state, checkoutData?.billing?.stateKey]);

  const handleCityBillingChange = (key, value) => {
    dispatch(updateCheckoutData({ name: "billing.city", value: value }));
    dispatch(updateCheckoutData({ name: "billing.cityKey", value: key }));
  };

  const changePaymentMethod = (value) => {
    dispatch(updateCheckoutData({ name: "payment", value: value }));
  };

  useEffect(() => {
    if (checkoutData.shipping.countryKey === "RO") {
      calculateShippingPrice(
        checkoutData?.payment,
        checkoutData?.shipping?.type,
        checkoutData.currency
      );
      dispatch(
        updateCheckoutData({ name: "shipping.provider", value: "Sameday" })
      );
    }
    console.log("Se schimba paymentul sau tara");
  }, [
    checkoutData?.payment,
    checkoutData?.shipping?.countryKey,
    checkoutData?.shipping?.type,
  ]);
  useEffect(() => {
    console.log(checkoutData);
    calculateCartSummary();
  }, [checkoutData]);

  const validadeRegisterEmail = async (e) => {
    e.preventDefault();
    handleChangeCheckoutData(e);

    const emailValue = e.target.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
      console.log("Email valid:", emailValue);

      const response = await fetch(
        `/api/data/json/checkout/check-if-email-exists/${emailValue}`
      );

      const body = await response.json();

      setExistsAccountWithEmail(body.body);
      console.log("email response - ", body.body);
    } else {
      setExistsAccountWithEmail(false);
    }
  };

  useEffect(() => {
    if (checkoutData?.shipping?.wantsAccount === true) {
      if (
        checkoutData?.shipping?.password.toString() ===
        checkoutData?.shipping?.rePassword.toString()
      ) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  }, [checkoutData?.shipping?.password, checkoutData?.shipping?.rePassword]);

  useEffect(() => {
    dispatch(
      updateCheckoutData({ name: "shipping.wantsAccount", value: false })
    );
    dispatch(updateCheckoutData({ name: "shipping.rePassword", value: "" }));
    dispatch(updateCheckoutData({ name: "shipping.password", value: "" }));
  }, [esxistsAccountWithEmail]);

  return (
    <>
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
                    value={loginDetails?.email}
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
                      type={loginPasswordVisible ? "text" : "password"}
                      name="password"
                      value={loginDetails?.password}
                      className="w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                      onChange={handleChangeLoginDetails}
                      required
                    />
                    <button
                      onClick={handleLoginPasswordVisibleClick}
                      type="button"
                      className="absolute right-0"
                    >
                      {loginPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <Link href="/lost-password" locale={locale}>
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
                    onChange={handleChangeCheckoutData}
                    value={checkoutData?.doctor}
                    className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  />
                </div>
              </div>
            </section>

            <section
              className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8 border-[1px] shadow-lg rounded-xl h-max "
              id="shipping"
            >
              <div className="p-8 bg-backgroundPrimary rounded-xl">
                <h2 className="text-2xl">2. {t("section-2-2-title")}</h2>

                <div>
                  <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0">
                    <div className="w-1/2 flex flex-col mb-2 max-md:w-full">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("register-form.fname-label")}
                      </label>
                      <input
                        placeholder={t("register-form.fname-ph")}
                        type="text"
                        name="shipping.fname"
                        onChange={handleChangeCheckoutData}
                        value={checkoutData?.shipping?.fname}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                    <div className="w-1/2 flex flex-col mb-2 max-md:w-full">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("register-form.lname-label")}
                      </label>
                      <input
                        placeholder={t("register-form.lname-ph")}
                        type="text"
                        name="shipping.lname"
                        onChange={handleChangeCheckoutData}
                        value={checkoutData?.shipping?.lname}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0 ">
                    <div className="w-1/2 flex flex-col mb-2 max-md:w-full">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("register-form.phone-label")}
                      </label>
                      <PhoneInput
                        value={checkoutData?.shipping?.phone}
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
                    <div className="w-1/2 flex flex-col mb-2 max-md:w-full">
                      <label className="px-1 text-foregroundPrimary70">
                        {t("register-form.email-label")}
                      </label>
                      <input
                        placeholder={t("register-form.email-ph")}
                        type="email"
                        name="shipping.email"
                        onChange={validadeRegisterEmail}
                        value={checkoutData?.shipping?.email}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
                  </div>

                  {esxistsAccountWithEmail === true ? (
                    <>
                      <div className="relative w-full mx-auto border-foregroundSecondary20 mt-4  border-[1px] shadow-lg rounded-xl h-max overflow-hidden ">
                        <div className="relative w-full flex flex-row  flex items-center content-center justify-center bg-backgroundPrimary p-1 z-10 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:z-0 before:from-gradientGreen before:to-gradientPurple ">
                          <div className="relative z-10 p-4 bg-backgroundPrimary content-['']  rounded-lg w-full h-full ">
                            <h3 className="text-xl text-center">
                              {t("register-form.already-account")} -{" "}
                              <button
                                onClick={handleSetIsClient}
                                className="text-gradientPurple"
                              >
                                {t("register-form.login")}
                              </button>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <h3 className="text-xl">
                          {t("register-form.want-account")}
                        </h3>
                        <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                          <div
                            className={`absolute w-1/2 top-0 "left-0" ${
                              checkoutData?.shipping?.wantsAccount
                                ? "translate-x-full bg-right rounded-l-lg"
                                : "translate-x-0 bg-left rounded-r-lg"
                            }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                          ></div>
                          <button
                            type="button"
                            className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                              checkoutData?.shipping?.wantsAccount
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
                              checkoutData?.shipping?.wantsAccount
                                ? "text-backgroundPrimary"
                                : "text-foregroundPrimary"
                            }`}
                            onClick={() => handleWantsAccount(true)}
                          >
                            {t("register-form.wants-account-yes")}
                          </button>
                        </div>

                        {checkoutData?.shipping?.wantsAccount ? (
                          <>
                            <div className="flex flex-row gap-8 max-sm:flex-col max-sm:gap-2">
                              <div className="w-full flex flex-col mb-2">
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("register-form.password-label")}
                                </label>
                                <div className="relative flex flex-row items-center content-center">
                                  <input
                                    placeholder={t("register-form.password-ph")}
                                    type={
                                      newPasswordVisible ? "text" : "password"
                                    }
                                    name="shipping.password"
                                    onChange={handleChangeCheckoutData}
                                    value={checkoutData?.shipping?.password}
                                    className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ${
                                      passwordsMatch
                                        ? ""
                                        : "border-dashboardRed70"
                                    }`}
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
                                    placeholder={t(
                                      "register-form.re-password-ph"
                                    )}
                                    type={
                                      newPasswordVisible ? "text" : "password"
                                    }
                                    name="shipping.rePassword"
                                    onChange={handleChangeCheckoutData}
                                    value={checkoutData?.shipping?.rePassword}
                                    className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ${
                                      passwordsMatch
                                        ? ""
                                        : "border-dashboardRed70"
                                    }`}
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
                            {passwordsMatch ? (
                              <></>
                            ) : (
                              <>
                                <div className="relative w-full mx-auto border-foregroundSecondary20 mt-4  border-[1px] shadow-lg rounded-xl h-max overflow-hidden ">
                                  <div className="relative w-full flex flex-row  flex items-center content-center justify-center bg-backgroundPrimary p-1 z-10 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:z-0 before:from-gradientGreen before:to-gradientPurple ">
                                    <div className="relative z-10 p-4 bg-backgroundPrimary content-['']  rounded-lg w-full h-full ">
                                      <h3 className="text-xl text-center">
                                        {t("register-form.passwords-error")}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  )}
                </div>

                <h3 className="text-xl mt-4">
                  {t("shipping-form.shipping-method")}
                </h3>
                <div className="w-full flex flex-col mb-2">
                  <label className="px-1 text-foregroundPrimary70">
                    {t("shipping-form.country-label")}
                  </label>
                  <SelectInput
                    data={countries}
                    value={checkoutData?.shipping?.country}
                    name={"shipping.country"}
                    onChange={handleCountryChange}
                    // onClear={handleClearCountry}
                    placeholder={t("shipping-form.country-ph")}
                    required={true}
                  />
                </div>
                {checkoutData?.shipping?.country === "Romania" ? (
                  <>
                    <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                      <div
                        className={`absolute w-1/2 top-0 "left-0" ${
                          checkoutData?.shipping?.type !== "easybox"
                            ? "translate-x-0 bg-left rounded-r-lg"
                            : "translate-x-full bg-right rounded-l-lg"
                        }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                      ></div>
                      <button
                        type="button"
                        className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                          checkoutData?.shipping?.type === "easybox"
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
                          checkoutData?.shipping?.type === "easybox"
                            ? "text-backgroundPrimary"
                            : "text-foregroundPrimary"
                        }`}
                        onClick={() => changeDeliveryType("easybox")}
                      >
                        {t("shipping-form.shipping-type.easybox")}
                      </button>
                    </div>

                    {checkoutData?.shipping?.type === "easybox" ? (
                      <>
                        {samedayLockerInstanceLoading ? (
                          <></>
                        ) : (
                          <>
                            <div>
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.easybox.label")}
                              </label>

                              <input
                                type="text"
                                value={checkoutData?.shipping?.locker?.id}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                                readOnly
                              />
                              {checkoutData?.shipping?.locker !== null ? (
                                <>
                                  <p className="font-bold">
                                    {checkoutData?.shipping?.locker?.name},{" "}
                                    {checkoutData?.shipping?.locker?.address},{" "}
                                    {checkoutData?.shipping?.locker?.city},{" "}
                                    {checkoutData?.shipping?.locker?.county}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={openSamedayLockerMap}
                                    className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                                  >
                                    {t(
                                      "shipping-form.easybox.change-button-text"
                                    )}
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={openSamedayLockerMap}
                                    className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                                  >
                                    {t("shipping-form.easybox.button-text")}
                                  </button>
                                </>
                              )}
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
                                {t("shipping-form.state-label")}
                              </label>
                              <SelectInput
                                data={statesOfSelectedCountry}
                                value={checkoutData?.shipping.state}
                                name={"shipping.state"}
                                onChange={handleStateChange}
                                // onClear={handleClearState}
                                placeholder={t("shipping-form.state-ph")}
                                disabled={statesOfSelectedCountry.length === 0}
                                required={statesOfSelectedCountry.length !== 0}
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("shipping-form.city-label")}
                              </label>
                              <SelectInput
                                data={citiesOfSelectedState}
                                value={checkoutData?.shipping?.city}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.shipping?.postalCode}
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
                              onChange={handleChangeCheckoutData}
                              value={checkoutData?.shipping?.address}
                              className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                              required
                            />
                          </div>
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
                            {t("shipping-form.state-label")}
                          </label>
                          <SelectInput
                            data={statesOfSelectedCountry}
                            value={checkoutData?.shipping?.state}
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
                            value={checkoutData?.shipping?.city}
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
                            onChange={handleChangeCheckoutData}
                            value={checkoutData?.shipping?.postalCode}
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
                          onChange={handleChangeCheckoutData}
                          value={checkoutData?.shipping?.address}
                          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="px-1 text-foregroundPrimary70">
                        {t("shipping-form.provider-label")}
                      </label>
                      <div className="flex flex-row gap-8 ">
                        <label
                          className={`w-1/2 border-[1px] rounded-lg p-4 transition-all duration-[0.3s] ${
                            checkoutData?.shipping?.provider === "DHL"
                              ? "border-foregroundPrimary90"
                              : "border-foregroundPrimary20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping.provider"
                            value="DHL"
                            onChange={handleChangeCheckoutData}
                            checked={checkoutData?.shipping?.provider === "DHL"}
                            className="mr-2"
                            required
                          />{" "}
                          <span>DHL</span>
                        </label>
                        <label
                          className={`w-1/2 border-[1px] rounded-lg p-4 transition-all duration-[0.3s] ${
                            checkoutData?.shipping?.provider === "UPS"
                              ? "border-foregroundPrimary90"
                              : "border-foregroundPrimary20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping.provider"
                            value="UPS"
                            onChange={handleChangeCheckoutData}
                            checked={checkoutData?.shipping?.provider === "UPS"}
                            className="mr-2"
                            required
                          />{" "}
                          UPS
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
            <section
              className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max"
              id="billing"
            >
              <div className="p-8 bg-backgroundPrimary rounded-xl">
                <h2 className="text-2xl">3. {t("section-3-title")}</h2>{" "}
                <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-6">
                  <div
                    className={`absolute w-1/2 top-0 "left-0" ${
                      checkoutData?.billing?.asShipping
                        ? "translate-x-0 bg-left rounded-r-lg"
                        : "translate-x-full bg-right rounded-l-lg"
                    }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                  ></div>
                  <button
                    type="button"
                    className={`w-1/2 text-xl py-3 px-2 z-10 transition-all duration-300 ${
                      checkoutData?.billing?.asShipping
                        ? "text-backgroundPrimary"
                        : "text-foregroundPrimary"
                    }`}
                    onClick={() => changeBillingDetailsAsShipping(true)}
                  >
                    {t("billing-form.same-details-as-shipping")}
                  </button>
                  <button
                    type="button"
                    className={`w-1/2 text-xl py-3  px-2 z-10 transition-all duration-300 ${
                      checkoutData?.billing?.asShipping
                        ? "text-foregroundPrimary"
                        : "text-backgroundPrimary"
                    }`}
                    onClick={() => changeBillingDetailsAsShipping(false)}
                  >
                    {t("billing-form.new-details")}
                  </button>
                </div>
                {checkoutData?.billing?.asShipping ? (
                  <></>
                ) : (
                  <>
                    <label className=" px-1 text-foregroundPrimary70">
                      {t("billing-form.pf-or-pj-label")}
                    </label>
                    <div className="relative  w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                      <div
                        className={`absolute w-1/2 top-0 "left-0" ${
                          checkoutData?.billing?.entity === "pf"
                            ? "translate-x-0 bg-left rounded-r-lg"
                            : "translate-x-full bg-right rounded-l-lg"
                        }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                      ></div>
                      <button
                        type="button"
                        className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                          checkoutData?.billing?.entity === "pf"
                            ? "text-backgroundPrimary"
                            : "text-foregroundPrimary"
                        }`}
                        onClick={() => changeBillingDetailsToPF("pf")}
                      >
                        {t("billing-form.pf")}
                      </button>
                      <button
                        type="button"
                        className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                          checkoutData?.billing?.entity === "pf"
                            ? "text-foregroundPrimary"
                            : "text-backgroundPrimary"
                        }`}
                        onClick={() => changeBillingDetailsToPF("pj")}
                      >
                        {t("billing-form.pj")}
                      </button>
                    </div>
                    {checkoutData?.billing?.entity === "pf" ? (
                      <>
                        <div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.fname-label")}
                              </label>
                              <input
                                placeholder={t("billing-form.fname-ph")}
                                type="text"
                                name="billing.fname"
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing?.fname}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing?.lname}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
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
                                value={checkoutData?.billing.phone}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing.email}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.country-label")}
                              </label>
                              <SelectInput
                                data={countries}
                                value={checkoutData?.billing.country}
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
                                value={checkoutData?.billing.state}
                                name={"billing-state"}
                                onChange={handleStateBillingChange}
                                placeholder={t("billing-form.state-ph")}
                                disabled={
                                  statesOfSelectedCountryBilling.length === 0
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.city-label")}
                              </label>
                              <SelectInput
                                data={citiesOfSelectedStateBilling}
                                value={checkoutData?.billing.city}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing.postalCode}
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
                              onChange={handleChangeCheckoutData}
                              value={checkoutData?.billing.address}
                              className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                              required
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.company-name-label")}
                              </label>
                              <input
                                placeholder={t("billing-form.company-name-ph")}
                                type="text"
                                name="billing.companyName"
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing?.companyName}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing?.companyCif}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
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
                                value={checkoutData?.billing.phone}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing.email}
                                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.country-label")}
                              </label>
                              <SelectInput
                                data={countries}
                                value={checkoutData?.billing.country}
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
                                value={checkoutData?.billing.state}
                                name={"billing-state"}
                                onChange={handleStateBillingChange}
                                placeholder={t("billing-form.state-ph")}
                                disabled={
                                  statesOfSelectedCountryBilling.length === 0
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full flex flex-row gap-8 max-md:gap-0 max-md:flex-col">
                            <div className="w-full flex flex-col mb-2">
                              <label className="px-1 text-foregroundPrimary70">
                                {t("billing-form.city-label")}
                              </label>
                              <SelectInput
                                data={citiesOfSelectedStateBilling}
                                value={checkoutData?.billing.city}
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
                                onChange={handleChangeCheckoutData}
                                value={checkoutData?.billing.postalCode}
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
                              onChange={handleChangeCheckoutData}
                              value={checkoutData?.billing.address}
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

            {checkoutData?.shipping?.country === "Romania" &&
            checkoutData?.shipping.type === "courier" ? (
              <>
                <section
                  className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max"
                  id="payment"
                >
                  <div className="p-8 bg-backgroundPrimary rounded-xl">
                    <h2 className="text-2xl">4. {t("payment-method-title")}</h2>

                    <label className=" px-1 text-foregroundPrimary70">
                      {t("payment-method-label")}
                    </label>
                    <div className="relative  w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
                      <div
                        className={`absolute w-1/2 top-0 "left-0" ${
                          checkoutData?.payment === "card"
                            ? "translate-x-0 bg-left rounded-r-lg"
                            : "translate-x-full bg-right rounded-l-lg"
                        }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
                      ></div>
                      <button
                        type="button"
                        className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                          checkoutData?.payment === "card"
                            ? "text-backgroundPrimary"
                            : "text-foregroundPrimary"
                        }`}
                        onClick={() => changePaymentMethod("card")}
                      >
                        {t("payment-card")}
                      </button>
                      <button
                        type="button"
                        className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                          checkoutData?.payment === "card"
                            ? "text-foregroundPrimary"
                            : "text-backgroundPrimary"
                        }`}
                        onClick={() => changePaymentMethod("cash")}
                      >
                        {t("payment-cash")}
                      </button>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <></>
            )}

            <section className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max">
              <div className="p-8 bg-backgroundPrimary rounded-xl">
                <h2 className="text-2xl">Sumar comanda</h2>

                <div className="flex flex-row mb-4 pb-2 border-b-[1px] border-b-foregroundPrimary20">
                  <div className="w-1/2 flex items-end">
                    <table className="w-full">
                      <tbody>
                        {cart.map((item, index) => (
                          <tr key={index}>
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
                      {t("total-products")}: {summaryData.productsTotal}{" "}
                      {checkoutData.currency}
                    </p>
                    {summaryData.promoTotal === 0 ? (
                      <></>
                    ) : (
                      <>
                        <p className="text-right">
                          {t("total-promocode")}: -{summaryData.promoTotal}{" "}
                          {checkoutData.currency}
                        </p>
                      </>
                    )}

                    <p className="text-right">
                      {t("total-shipping")}: {summaryData.shippingTotal}{" "}
                      {checkoutData.currency}
                    </p>
                    <h2 className="text-right text-2xl font-bold">
                      {t("total-order")}: {summaryData.orderTotal}{" "}
                      {checkoutData.currency}
                    </h2>
                  </div>
                </div>
                <button
                  type="submit"
                  // onClick={handleFormSubmit}
                  className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                  disabled={
                    checkoutData?.shipping?.wantsAccount === true
                      ? !passwordsMatch
                      : false
                  }
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
    </>
  );
}

export default CheckoutNotLoggedIn;
