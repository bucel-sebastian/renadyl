"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import SelectInput from "@/components/SelectInput";

import countriesData from "@/public/json/countriesData.json";
import { getSession } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Sofia_Sans } from "next/font/google";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

function NewBillingDetails({ getUpdatedData }) {
  const [newBillingData, setNewBillingData] = useState({
    address: "",
    city: "",
    cityKey: "",
    country: "",
    countryKey: "",
    email: "",
    entity: "pf",
    fname: "",
    lname: "",
    phone: "",
    postalCode: "",
    state: "",
    stateKey: "",
    companyName: "",
    companyCif: "",
  });

  const t = useTranslations("Checkout");

  const countries = new Object();
  const states = new Object();

  const handleChangeBillingData = (e) => {
    const { name, value } = e.target;
    const nameSplit = name.split(".");
    const propName = nameSplit[1];
    setNewBillingData((prevData) => ({ ...prevData, [propName]: value }));
  };

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

  const changeBillingDetailsToPF = (value) => {
    // dispatch(updateCheckoutData({ name: "billing.entity", value: value }));
    setNewBillingData((prevData) => ({ ...prevData, entity: value }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    if (event.target.name) {
      handleChangeBillingData(event);
    }
  };

  const handleCountryBillingChange = (key, value) => {
    setNewBillingData((prevData) => ({
      ...prevData,
      country: value,
      countryKey: key,
    }));
    // dispatch(updateCheckoutData({ name: "billing.country", value: value }));
    // dispatch(updateCheckoutData({ name: "billing.countryKey", value: key }));
  };

  const [statesOfSelectedCountryBilling, setStatesOfSelectedCountryBilling] =
    useState([]);
  useEffect(() => {
    const statesOfCountry = new Object();
    if (newBillingData.countryKey && newBillingData.countryKey !== "") {
      states[newBillingData.countryKey].forEach((state) => {
        statesOfCountry[state.state_code] = state.name;
      });
      setStatesOfSelectedCountryBilling(statesOfCountry);
    } else {
      setStatesOfSelectedCountryBilling([]);
      handleStateBillingChange("", "");
    }
  }, [newBillingData.country, newBillingData.countryKey]);

  const handleStateBillingChange = (key, value) => {
    setNewBillingData((prevData) => ({
      ...prevData,
      state: value,
      stateKey: key,
    }));
    // dispatch(updateCheckoutData({ name: "billing.state", value: value }));
    // dispatch(updateCheckoutData({ name: "billing.stateKey", value: key }));
  };

  const [citiesOfSelectedStateBilling, setCitiesOfSelectedStateBilling] =
    useState([]);
  useEffect(() => {
    const citiesOfState = new Object();
    if (newBillingData.stateKey && newBillingData.stateKey !== "") {
      states[newBillingData.countryKey].forEach((state) => {
        if (state.state_code === newBillingData.stateKey) {
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
  }, [newBillingData.state, newBillingData.stateKey]);

  const handleCityBillingChange = (key, value) => {
    setNewBillingData((prevData) => ({
      ...prevData,
      city: value,
      cityKey: key,
    }));
    // dispatch(updateCheckoutData({ name: "billing.city", value: value }));
    // dispatch(updateCheckoutData({ name: "billing.cityKey", value: key }));
  };

  const handleAddNewBillingDetails = async (e) => {
    e.preventDefault();

    const session = await getSession();
    if (session) {
      const apiDataToSend = { ...newBillingData, clientId: session?.user?.id };
      const response = await fetch(`/api/client/add/new-billing-details`, {
        method: "POST",
        body: JSON.stringify(apiDataToSend),
      });
      if (response.ok) {
        const body = await response.json();
        console.log(body);
        if (body.response) {
          setNewBillingData({
            address: "",
            city: "",
            cityKey: "",
            country: "",
            countryKey: "",
            email: "",
            entity: "pf",
            fname: "",
            lname: "",
            phone: "",
            postalCode: "",
            state: "",
            stateKey: "",
            companyName: "",
            companyCif: "",
          });
          getUpdatedData();
          toast.success(t("add-billing-data-success"), {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(t("add-billing-data-fail"), {
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
      } else {
        toast.error(t("add-billing-data-fail"), {
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
    } else {
      toast.error(t("add-billing-data-fail"), {
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
  };

  return (
    <form onSubmit={handleAddNewBillingDetails}>
      <label className=" px-1 text-foregroundPrimary70">
        {t("billing-form.pf-or-pj-label")}
      </label>
      <div className="relative  w-full flex flex-row bg-backgroundPrimary border-[1px] border-foregroundPrimary20 rounded-xl overflow-hidden mb-4">
        <div
          className={`absolute w-1/2 top-0 "left-0" ${
            newBillingData?.entity === "pf"
              ? "translate-x-0 bg-left rounded-r-lg"
              : "translate-x-full bg-right rounded-l-lg"
          }  h-full bg-gradient-to-r from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%]  transition-all duration-300`}
        ></div>
        <button
          type="button"
          className={`w-1/2 text-xl py-3 z-10 transition-all duration-300 ${
            newBillingData?.entity === "pf"
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
            newBillingData?.entity === "pf"
              ? "text-foregroundPrimary"
              : "text-backgroundPrimary"
          }`}
          onClick={() => changeBillingDetailsToPF("pj")}
        >
          {t("billing-form.pj")}
        </button>
      </div>
      {newBillingData?.entity === "pf" ? (
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.fname}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.lname}
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
                  value={newBillingData?.phone}
                  placeholder={t("billing-form.phone-ph")}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "billing.phone",
                    required: true,
                    autoFocus: true,
                  }}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.email}
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
                  value={newBillingData?.country}
                  name={"billing-country"}
                  onChange={handleCountryBillingChange}
                  placeholder={t("billing-form.country-ph")}
                  required={true}
                />
              </div>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("billing-form.state-label")}
                </label>
                <SelectInput
                  data={statesOfSelectedCountryBilling}
                  value={newBillingData?.state}
                  name={"billing-state"}
                  onChange={handleStateBillingChange}
                  placeholder={t("billing-form.state-ph")}
                  disabled={statesOfSelectedCountryBilling.length === 0}
                  required={true}
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
                  value={newBillingData?.city}
                  name={"billing-city"}
                  onChange={handleCityBillingChange}
                  placeholder={t("billing-form.city-ph")}
                  disabled={citiesOfSelectedStateBilling.length === 0}
                  required={true}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.postalCode}
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
                onChange={handleChangeBillingData}
                value={newBillingData?.address}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.companyName}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.companyCif}
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
                  value={newBillingData?.phone}
                  placeholder={t("billing-form.phone-ph")}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "billing.phone",
                    required: true,
                    autoFocus: true,
                  }}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.email}
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
                  value={newBillingData?.country}
                  name={"billing-country"}
                  onChange={handleCountryBillingChange}
                  placeholder={t("billing-form.country-ph")}
                  required={true}
                />
              </div>
              <div className="w-full flex flex-col mb-2">
                <label className="px-1 text-foregroundPrimary70">
                  {t("billing-form.state-label")}
                </label>
                <SelectInput
                  data={statesOfSelectedCountryBilling}
                  value={newBillingData?.state}
                  name={"billing-state"}
                  onChange={handleStateBillingChange}
                  placeholder={t("billing-form.state-ph")}
                  disabled={statesOfSelectedCountryBilling.length === 0}
                  required={true}
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
                  value={newBillingData?.city}
                  name={"billing-city"}
                  onChange={handleCityBillingChange}
                  placeholder={t("billing-form.city-ph")}
                  disabled={citiesOfSelectedStateBilling.length === 0}
                  required={true}
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
                  onChange={handleChangeBillingData}
                  value={newBillingData?.postalCode}
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
                onChange={handleChangeBillingData}
                value={newBillingData?.address}
                className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                required
              />
            </div>
          </div>
        </>
      )}
      <button
        type="submit"
        className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
      >
        {t("submit-add-btn")}
      </button>
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
    </form>
  );
}

export default NewBillingDetails;
