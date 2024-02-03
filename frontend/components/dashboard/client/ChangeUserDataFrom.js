"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangeUserDataFrom({ userInitialData, getUserData }) {
  const [updatedData, setUpdatedData] = useState(null);

  const t = useTranslations("Dashboard.client.settings");

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    handleChangeUserData(event);
  };

  useEffect(() => {
    setUpdatedData({ ...userInitialData });
  }, [userInitialData]);

  useEffect(() => {
    console.log("updated data", updatedData);
  }, [updatedData]);

  const handleSubmitUserData = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/client/add/new-details/", {
      method: "POST",
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      const body = await response.json();
      if (body.response) {
        getUserData();
        toast.success(t("change-user-details-success"), {
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
        toast.error(t("change-user-details-fail"), {
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
      toast.error(t("change-user-details-fail"), {
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
    <form className="w-1/2 max-xl:w-full" onSubmit={handleSubmitUserData}>
      <h2 className="text-xl font-bold">{t("account-settings-title")}</h2>
      <div className="w-2/3 max-xl:w-full">
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("update-data-form.fname-label")}*
          </label>
          <input
            placeholder={t("update-data-form.fname-ph")}
            type="text"
            name="f_name"
            onChange={handleChangeUserData}
            value={updatedData?.f_name}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("update-data-form.lname-label")}*
          </label>
          <input
            placeholder={t("update-data-form.lname-ph")}
            type="text"
            name="l_name"
            onChange={handleChangeUserData}
            value={updatedData?.l_name}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("update-data-form.email-label")}*
          </label>
          <input
            placeholder={t("update-data-form.email-ph")}
            type="text"
            name="email"
            onChange={handleChangeUserData}
            value={updatedData?.email}
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2 max-md:w-full">
          <label className="px-1 text-foregroundPrimary70">
            {t("update-data-form.phone-label")}
          </label>
          <PhoneInput
            value={updatedData?.phone}
            placeholder={t("update-data-form.phone-ph")}
            onChange={handlePhoneChange}
            inputProps={{
              name: "phone",
              required: false,
              autoFocus: true,
            }}
            containerClass="w-full"
            inputClass="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 w-full focus:border-foregroundPrimary py-1 px-1"
            specialLabel=""
          />
        </div>
        <button
          type="submit"
          className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
          disabled={
            JSON.stringify(userInitialData) === JSON.stringify(updatedData)
          }
        >
          {t("update-data-form.submit-update-user-data-btn")}
        </button>
      </div>
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

export default ChangeUserDataFrom;
