"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import PhoneInput from "react-phone-input-2";
import SelectInput from "@/components/SelectInput";

import countriesData from "@/public/json/countriesData.json";
import { getSession } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewShippginDetails({ getUpdatedData }) {
  const [newShippingData, setNewShippingData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    country: "",
    countryKey: "",
    state: "",
    stateKey: "",
    city: "",
    cityKey: "",
    postalCode: "",
    address: "",
  });

  const t = useTranslations("Checkout");

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
    // dispatch(updateCheckoutData({ name: "shipping.country", value: value }));
    // dispatch(updateCheckoutData({ name: "shipping.countryKey", value: key }));
    // dispatch(updateCheckoutData({ name: "shipping.type", value: "courier" }));

    setNewShippingData((prevData) => ({
      ...prevData,
      country: value,
      countryKey: key,
    }));
  };

  const [statesOfSelectedCountry, setStatesOfSelectedCountry] = useState([]);
  useEffect(() => {
    const statesOfCountry = new Object();
    if (newShippingData.countryKey && newShippingData.countryKey !== "") {
      states[newShippingData?.countryKey].forEach((state) => {
        statesOfCountry[state.state_code] = state.name;
      });
      setStatesOfSelectedCountry(statesOfCountry);
    } else {
      setStatesOfSelectedCountry([]);
      handleStateChange("", "");
    }
  }, [newShippingData?.country, newShippingData?.countryKey]);

  const handleStateChange = (key, value) => {
    console.log("State change ", value, key);
    // dispatch(updateCheckoutData({ name: "shipping.state", value: value }));
    // dispatch(updateCheckoutData({ name: "shipping.stateKey", value: key }));
    setNewShippingData((prevData) => ({
      ...prevData,
      state: value,
      stateKey: key,
    }));
  };

  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState([]);
  useEffect(() => {
    const citiesOfState = new Object();
    if (newShippingData.stateKey && newShippingData.stateKey !== "") {
      states[newShippingData.countryKey].forEach((state) => {
        if (state.state_code === newShippingData?.stateKey) {
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
  }, [newShippingData?.state, newShippingData?.stateKey]);

  const handleCityChange = (key, value) => {
    // dispatch(updateCheckoutData({ name: "shipping.city", value: value }));
    // dispatch(updateCheckoutData({ name: "shipping.cityKey", value: key }));
    setNewShippingData((prevData) => ({
      ...prevData,
      city: value,
      cityKey: key,
    }));
  };

  const handleAddNewShippingDetails = async (e) => {
    e.preventDefault();

    const session = await getSession();
    if (session) {
      const apiDataToSend = { ...newShippingData, clientId: session?.user?.id };
      const response = await fetch(`/api/client/add/new-shipping-details`, {
        method: "POST",
        body: JSON.stringify(apiDataToSend),
      });
      if (response.ok) {
        const body = await response.json();
        console.log(body);
        if (body.response) {
          setNewShippingData({
            fname: "",
            lname: "",
            phone: "",
            email: "",
            country: "",
            countryKey: "",
            state: "",
            stateKey: "",
            city: "",
            cityKey: "",
            postalCode: "",
            address: "",
          });
          getUpdatedData();
          toast.success(t("add-shipping-data-success"), {
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
          toast.error(t("add-shipping-data-fail"), {
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
        toast.error(t("add-shipping-data-fail"), {
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
      toast.error(t("add-shipping-data-fail"), {
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

  const handleChangeShippingData = (e) => {
    const { name, value } = e.target;
    const nameSplit = name.split(".");
    const propName = nameSplit[1];
    setNewShippingData((prevData) => ({ ...prevData, [propName]: value }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    handleChangeShippingData(event);
  };

  return (
    <form onSubmit={handleAddNewShippingDetails}>
      <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0">
        <div className="w-1/2 flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("register-form.fname-label")}
          </label>
          <input
            placeholder={t("register-form.fname-ph")}
            type="text"
            name="shipping.fname"
            onChange={handleChangeShippingData}
            value={newShippingData?.fname}
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
            onChange={handleChangeShippingData}
            value={newShippingData?.lname}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0">
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("register-form.phone-label")}
          </label>
          <PhoneInput
            value={newShippingData?.phone}
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
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("register-form.email-label")}
          </label>
          <input
            placeholder={t("register-form.email-ph")}
            type="email"
            name="shipping.email"
            onChange={handleChangeShippingData}
            value={newShippingData?.email}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
      </div>
      <div className="w-full flex flex-row gap-8 max-md:flex-col max-md:gap-0">
        <div className="w-full flex flex-col mb-2">
          <label className="px-1 text-foregroundPrimary70">
            {t("shipping-form.country-label")}
          </label>
          <SelectInput
            data={countries}
            value={newShippingData?.country}
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
            value={newShippingData?.state}
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
            value={newShippingData?.city}
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
            onChange={handleChangeShippingData}
            value={newShippingData?.postalCode}
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
          onChange={handleChangeShippingData}
          value={newShippingData?.address}
          className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
          required
        />
      </div>
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

export default NewShippginDetails;
