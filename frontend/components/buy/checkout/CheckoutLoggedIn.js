"use client";
import { Link, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { updateCheckoutData } from "@/redux/slices/cartSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SelectInput from "@/components/SelectInput";

import countriesData from "@/public/json/countriesData.json";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import { useRouter } from "next-intl/client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBlock from "@/components/LoadingBlock";

import { Sofia_Sans } from "next/font/google";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

function CheckoutLoggedIn({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("Checkout");

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    router.replace("/cart", { locale: locale });
  }

  const [summaryData, setSummaryData] = useState({
    orderTotal: 0,
    productsTotal: 0,
    productsSaleTotal: 0,
    promoTotal: 0,
    shippingTotal: 0,
    vatProcent: 0,
    vatTotal: 0,
  });

  const invalidCharacters = [
    "!",
    "#",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "+",
    "/",
    "?",
    "<",
    ">",
    "[",
    "]",
    "{",
    "}",
    "|",
    "`",
    "~",
  ];

  const [savedShippingDatas, setSavedShippingDatas] = useState([]);
  const [newShippingData, setNewShippingData] = useState(false);
  const [savedShippingDatasFetched, setSavedShippingDatasFetched] =
    useState(false);
  const [savedBillingDatas, setSavedBillingDatas] = useState([]);
  const [newBillingData, setNewBillingData] = useState(false);
  const [savedBillingDatasFetched, setSavedBillingDatasFetched] =
    useState(false);

  const [shippingDataIsValid, setShippingDataIsValid] = useState(true);

  const dispatch = useDispatch();

  const handleChangeCheckoutData = (e) => {
    const { name, value } = e.target;

    const regex = new RegExp(`[${invalidCharacters.join("\\")}]`);
    if (value === "") {
      dispatch(updateCheckoutData({ name: name, value: value }));
    } else if (name.includes("phone")) {
      dispatch(updateCheckoutData({ name: name, value: value }));
    } else {
      if (!regex.test(value)) {
        dispatch(updateCheckoutData({ name: name, value: value }));
      }
    }
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    if (event.target.name) {
      handleChangeCheckoutData(event);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    if (
      checkoutData?.shipping?.type === "easybox" &&
      checkoutData?.shipping?.locker === null
    ) {
      toast.error(t("locker-not-selected-error"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      document.getElementById("shipping").scrollIntoView();
      return;
    }

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

    if (data.checkoutIsValid === false) {
      if (shippingDataIsValid !== false) {
        toast.error(t("shipping-data-error"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }

    setShippingDataIsValid(data.checkoutIsValid);

    // console.log("summary data - ", data.body);
    setSummaryData(data.body);
  };

  const getShippingDatas = async () => {
    const session = await getSession();
    // console.log("Session - ", session);
    const response = await fetch(
      `/api/client/data/json/get-shipping-datas/${session.user.id}`
    );
    const body = await response.json();
    setSavedShippingDatas(body.body);
    setSavedShippingDatasFetched(true);
  };

  const getBillingDatas = async () => {
    const session = await getSession();
    const response = await fetch(
      `/api/client/data/json/get-billing-datas/${session.user.id}`
    );
    const body = await response.json();
    setSavedBillingDatas(body.body);
    setSavedBillingDatasFetched(true);
  };

  useEffect(() => {
    dispatch(updateCheckoutData({ name: "shipping.rePassword", value: "" }));
    dispatch(updateCheckoutData({ name: "shipping.password", value: "" }));

    getShippingDatas();
    getBillingDatas();
    if (window?.location?.hash) {
      // console.log("Has #");
      // handleSetIsNotClient();
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
    // console.log("Sameday Easybox plugin response: ", msg);

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
    // console.log("State change ", value, key);
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
    // console.log("Se schimba paymentul sau tara");
  }, [
    checkoutData?.payment,
    checkoutData?.shipping?.countryKey,
    checkoutData?.shipping?.type,
  ]);

  useEffect(() => {
    // console.log(checkoutData);
    calculateCartSummary();
  }, [checkoutData]);

  const handleFalseNewShippingData = () => {
    setNewShippingData(false);
  };
  const handleTrueNewShippingData = () => {
    dispatch(updateCheckoutData({ name: "shipping.savedData", value: null }));
    setNewShippingData(true);
  };
  const handleFalseNewBillingData = () => {
    setNewBillingData(false);
  };
  const handleTrueNewBillingData = () => {
    dispatch(updateCheckoutData({ name: "billing.savedData", value: null }));
    setNewBillingData(true);
  };

  useEffect(() => {
    // console.log("Saved shipping data - ", savedShippingDatas);
    if (savedShippingDatasFetched === true) {
      if (savedShippingDatas.length === 0) {
        handleTrueNewShippingData();
      } else {
        if (checkoutData.shipping.savedData === null) {
          handleTrueNewShippingData();
        } else {
          handleFalseNewShippingData();
        }
      }
    }
  }, [savedShippingDatas]);
  useEffect(() => {
    // console.log("Saved billing data - ", savedBillingDatas);
    if (savedBillingDatasFetched === true) {
      if (savedBillingDatas.length === 0) {
        handleTrueNewBillingData();
      } else {
        if (checkoutData.billing.savedData === null) {
          handleTrueNewBillingData();
        } else {
          handleFalseNewBillingData();
        }
      }
    }
  }, [savedBillingDatas]);

  useEffect(() => {
    if (checkoutData?.shipping?.savedData !== null) {
      dispatch(updateCheckoutData({ name: "shipping.address", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.city", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.cityKey", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.country", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.countryKey", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.email", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.fname", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.lname", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.locker", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.phone", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.postalCode", value: "" }));
      // dispatch(updateCheckoutData({ name: "shipping.provider", value: null }));
      dispatch(updateCheckoutData({ name: "shipping.save", value: false }));
      dispatch(updateCheckoutData({ name: "shipping.state", value: "" }));
      dispatch(updateCheckoutData({ name: "shipping.stateKey", value: "" }));
      dispatch(
        updateCheckoutData({ name: "shipping.wantsAccount", value: false })
      );
      dispatch(updateCheckoutData({ name: "shipping.type", value: "courier" }));
    }
  }, [checkoutData?.shipping?.savedData]);
  useEffect(() => {
    if (checkoutData?.billing?.savedData !== null) {
      dispatch(updateCheckoutData({ name: "billing.address", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.city", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.cityKey", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.companyCif", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.companyName", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.country", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.countryKey", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.email", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.fname", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.lname", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.phone", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.postalCode", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.save", value: false }));
      dispatch(updateCheckoutData({ name: "billing.state", value: "" }));
      dispatch(updateCheckoutData({ name: "billing.stateKey", value: "" }));
    }
  }, [checkoutData?.billing?.savedData]);

  useEffect(() => {
    if (checkoutData?.shipping?.savedData !== null) {
      for (let i = 0; i < savedShippingDatas.length; i++) {
        if (
          savedShippingDatas[i].id.toString() ===
          checkoutData?.shipping?.savedData.toString()
        ) {
          if (savedShippingDatas[i].country_key === "RO") {
            dispatch(
              updateCheckoutData({
                name: "shipping.provider",
                value: "Sameday",
              })
            );
          }
        }
      }
    }
  }, [checkoutData?.shipping?.savedData]);

  const handleCheckSaveShippingData = (e) => {
    if (checkoutData?.shipping?.save === true) {
      dispatch(updateCheckoutData({ name: "shipping.save", value: false }));
    } else {
      dispatch(updateCheckoutData({ name: "shipping.save", value: true }));
    }
  };
  const handleCheckSaveBillingData = (e) => {
    if (checkoutData?.billing?.save === true) {
      dispatch(updateCheckoutData({ name: "billing.save", value: false }));
    } else {
      dispatch(updateCheckoutData({ name: "billing.save", value: true }));
    }
  };

  return (
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

            <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
              <div
                className={`absolute w-1/2 top-0 "left-0" ${
                  newShippingData
                    ? "translate-x-full bg-right rounded-l-lg"
                    : "translate-x-0 bg-left rounded-r-lg"
                }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
              ></div>
              <button
                type="button"
                className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                  newShippingData
                    ? "text-foregroundPrimary"
                    : "text-backgroundPrimary"
                }`}
                onClick={handleFalseNewShippingData}
                disabled={savedShippingDatas.length === 0}
              >
                Date de livrare existente
              </button>
              <button
                type="button"
                className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                  newShippingData
                    ? "text-backgroundPrimary"
                    : "text-foregroundPrimary"
                }`}
                onClick={handleTrueNewShippingData}
              >
                Date noi de livrare
              </button>
            </div>

            {newShippingData ? (
              <>
                <div>
                  {/* {checkoutData?.shipping?.country === "Romania" ? (
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
                    </>
                  ) : (
                    <></>
                  )} */}
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
                        disableDropdown={false}
                        inputProps={{
                          name: "shipping.phone",
                          required: true,
                          autoFocus: true,
                        }}
                        country={locale}
                        autoFormat={true}
                        inputStyle={{
                          width: "100%",
                          padding: "0.25rem 0.25rem 0.25rem 48px",
                          height: "auto",
                          lineHeight: "28px",
                          background: "#fafafa",
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          borderBottom: "1px solid #1a1a1a66",
                          borderRadius: 0,
                          outline: "none",
                          fontSize: "18px",
                          fontWeight: "400",
                        }}
                        buttonStyle={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        dropdownStyle={{
                          borderRadius: "0.375rem",
                          border: "1px solid #1a1a1a66",
                          boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                          overflow: "auto",
                          background: "#fafafa",
                        }}
                        containerClass="w-full z-40 "
                        inputClass={`w-full  duration-300 transition-all   focus:border-foregroundPrimary ${sofiaSans.className}`}
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
                        onChange={handleChangeCheckoutData}
                        value={checkoutData?.shipping?.email}
                        className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                        required
                      />
                    </div>
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
                            <>
                              <LoadingBlock />
                            </>
                          ) : (
                            <>
                              <div>
                                <label className="px-1 text-foregroundPrimary70">
                                  {t("shipping-form.easybox.label")}
                                </label>

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
                                  disabled={
                                    statesOfSelectedCountry.length === 0
                                  }
                                  required={
                                    statesOfSelectedCountry.length !== 0
                                  }
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
                                  className={`bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] ${
                                    shippingDataIsValid === true
                                      ? "border-foregroundPrimary40 focus:border-foregroundPrimary"
                                      : "border-dashboardRed"
                                  }  py-1 px-1 `}
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
                            <div className="mt-2">
                              <label className="px-1 text-foregroundPrimary70">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  name="shipping.save"
                                  value="save_shipping_data"
                                  checked={checkoutData?.shipping?.save}
                                  onChange={handleCheckSaveShippingData}
                                />
                                Salvez datele de livrare
                              </label>
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
                              className={`bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] ${
                                shippingDataIsValid === true
                                  ? "border-foregroundPrimary40 focus:border-foregroundPrimary"
                                  : "border-dashboardRed"
                              }  py-1 px-1 `}
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
                      <div className="mt-2">
                        <label className="px-1 text-foregroundPrimary70">
                          <input
                            type="checkbox"
                            className="mr-2"
                            name="shipping.save"
                            value="save_shipping_data"
                            checked={checkoutData?.shipping?.save}
                            onChange={handleCheckSaveShippingData}
                          />
                          Salvez datele de livrare
                        </label>
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
                              checked={
                                checkoutData?.shipping?.provider === "DHL"
                              }
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
                              checked={
                                checkoutData?.shipping?.provider === "UPS"
                              }
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
              </>
            ) : (
              <>
                <label className="px-1 text-foregroundPrimary70">
                  Selecteaza o varianta
                </label>
                <div className="w-full flex flex-col gap-4">
                  {savedShippingDatas.map((option) => (
                    <label
                      key={option.id}
                      className={`w-full border-[1px] rounded-lg p-4 transition-all duration-[0.3s] flex flex-row items-start ${
                        checkoutData?.shipping?.savedData?.toString() ===
                        option.id.toString()
                          ? "border-foregroundPrimary90"
                          : "border-foregroundPrimary20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping.savedData"
                        value={option.id}
                        onChange={handleChangeCheckoutData}
                        checked={
                          checkoutData?.shipping?.savedData?.toString() ===
                          option.id.toString()
                        }
                        className="mr-2 mt-2"
                        required
                      />
                      <div>
                        <h4>
                          {option.f_name} {option.l_name}
                        </h4>

                        <p>{option.email}</p>
                        <p>{option.phone}</p>
                        <p>
                          {option.address} <br /> {option.postal_code},{" "}
                          {option.city}, {option.state}, {option.country}{" "}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {checkoutData?.shipping?.savedData === null ? (
                  <></>
                ) : (
                  <>
                    {savedShippingDatas.map((option) =>
                      option.id.toString() ===
                      checkoutData?.shipping?.savedData.toString() ? (
                        <>
                          {option.country_key === "RO" ? (
                            <></>
                          ) : (
                            <>
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
                                      checked={
                                        checkoutData?.shipping?.provider ===
                                        "DHL"
                                      }
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
                                      checked={
                                        checkoutData?.shipping?.provider ===
                                        "UPS"
                                      }
                                      className="mr-2"
                                      required
                                    />{" "}
                                    UPS
                                  </label>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
        <section
          className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max"
          id="billing"
        >
          <div className="p-8 bg-backgroundPrimary rounded-xl">
            <h2 className="text-2xl">3. {t("section-3-title")}</h2>

            <div className="relative w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
              <div
                className={`absolute w-1/2 top-0 "left-0" ${
                  newBillingData
                    ? "translate-x-full bg-right rounded-l-lg"
                    : "translate-x-0 bg-left rounded-r-lg"
                }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
              ></div>
              <button
                type="button"
                className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                  newBillingData
                    ? "text-foregroundPrimary"
                    : "text-backgroundPrimary"
                }`}
                onClick={handleFalseNewBillingData}
                disabled={savedBillingDatas.length === 0}
              >
                Date de facturare existente
              </button>
              <button
                type="button"
                className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
                  newBillingData
                    ? "text-backgroundPrimary"
                    : "text-foregroundPrimary"
                }`}
                onClick={handleTrueNewBillingData}
              >
                Date noi de facturare
              </button>
            </div>

            {newBillingData ? (
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
                            country={locale}
                            autoFormat={true}
                            inputStyle={{
                              width: "100%",
                              padding: "0.25rem 0.25rem 0.25rem 48px",
                              height: "auto",
                              lineHeight: "28px",
                              background: "#fafafa",
                              borderTop: "none",
                              borderRight: "none",
                              borderLeft: "none",
                              borderBottom: "1px solid #1a1a1a66",
                              borderRadius: 0,
                              outline: "none",
                              fontSize: "18px",
                              fontWeight: "400",
                            }}
                            buttonStyle={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            dropdownStyle={{
                              borderRadius: "0.375rem",
                              border: "1px solid #1a1a1a66",
                              boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                              overflow: "auto",
                              background: "#fafafa",
                            }}
                            containerClass="w-full z-40 "
                            inputClass={`w-full  duration-300 transition-all   focus:border-foregroundPrimary ${sofiaSans.className}`}
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
                            disabled={citiesOfSelectedStateBilling.length === 0}
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
                            country={locale}
                            autoFormat={true}
                            inputStyle={{
                              width: "100%",
                              padding: "0.25rem 0.25rem 0.25rem 48px",
                              height: "auto",
                              lineHeight: "28px",
                              background: "#fafafa",
                              borderTop: "none",
                              borderRight: "none",
                              borderLeft: "none",
                              borderBottom: "1px solid #1a1a1a66",
                              borderRadius: 0,
                              outline: "none",
                              fontSize: "18px",
                              fontWeight: "400",
                            }}
                            buttonStyle={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            dropdownStyle={{
                              borderRadius: "0.375rem",
                              border: "1px solid #1a1a1a66",
                              boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                              overflow: "auto",
                              background: "#fafafa",
                            }}
                            containerClass="w-full z-40 "
                            inputClass={`w-full  duration-300 transition-all   focus:border-foregroundPrimary ${sofiaSans.className}`}
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
                            disabled={citiesOfSelectedStateBilling.length === 0}
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
                <div className="mt-2">
                  <label className="px-1 text-foregroundPrimary70">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="billing.save"
                      value="save_billing_data"
                      checked={checkoutData?.billing?.save}
                      onChange={handleCheckSaveBillingData}
                    />
                    Salvez datele de livrare
                  </label>
                </div>
              </>
            ) : (
              <>
                <label className="px-1 text-foregroundPrimary70">
                  Selecteaza o varianta
                </label>
                <div className="w-full flex flex-col gap-4">
                  {savedBillingDatas.map((option) => (
                    <label
                      key={option.id}
                      className={`w-full border-[1px] rounded-lg p-4 transition-all duration-[0.3s] flex flex-row items-start ${
                        checkoutData?.billing?.savedData?.toString() ===
                        option.id.toString()
                          ? "border-foregroundPrimary90"
                          : "border-foregroundPrimary20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="billing.savedData"
                        value={option.id}
                        onChange={handleChangeCheckoutData}
                        checked={
                          checkoutData?.billing?.savedData?.toString() ===
                          option.id.toString()
                        }
                        className="mr-2 mt-2"
                        required
                      />
                      <div>
                        {option.entity === "pf" ? (
                          <>
                            <h4>
                              {option.f_name} {option.l_name}
                            </h4>
                          </>
                        ) : (
                          <>
                            <h4>
                              {option.company_name} - {option.company_cui}
                            </h4>
                          </>
                        )}
                        <p>{option.email}</p>
                        <p>{option.phone}</p>
                        <p>
                          {option.address} <br /> {option.postal_code},{" "}
                          {option.city}, {option.state}, {option.country}{" "}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {checkoutData?.shipping?.savedData === null ? (
          <>
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
          </>
        ) : (
          <>
            {savedShippingDatas.map((option) =>
              option.id.toString() ===
              checkoutData?.shipping?.savedData.toString() ? (
                <>
                  <div key={option.id}>
                    {option.country_key === "RO" ? (
                      <>
                        <section
                          className="relative block max-w-[1200px] w-full mx-auto border-foregroundSecondary20 mt-8  border-[1px] shadow-lg rounded-xl h-max"
                          id="payment"
                        >
                          <div className="p-8 bg-backgroundPrimary rounded-xl">
                            <h2 className="text-2xl">
                              4. {t("payment-method-title")}
                            </h2>

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
                    ) : null}
                  </div>
                </>
              ) : null
            )}
          </>
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
              disabled={!shippingDataIsValid}
            >
              {t("next-step-btn")}
            </button>
          </div>
        </section>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script
        src="https://cdn.sameday.ro/locker-plugin/lockerpluginsdk.js"
        // strategy="beforeInteractive"
        onLoad={initSamedayLocker}
      />
    </>
  );
}

export default CheckoutLoggedIn;
