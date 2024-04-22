"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import { FaEyeSlash, FaEye } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import LoadingBlock from "@/components/LoadingBlock";

function AdminAccountSettings({ getUpdatedData }) {
  const { data, update } = useSession();

  const [initialAccountSettings, setInitialAccountSettings] = useState({
    f_name: data?.user?.f_name,
    l_name: data?.user?.l_name,
    email: data?.user?.email,
    phone: data?.user?.phone,
  });
  const [updatedAccountSettings, setUpdatedAccountSettings] = useState({
    id: data?.user?.id,
    f_name: data?.user?.f_name,
    l_name: data?.user?.l_name,
    email: data?.user?.email,
    phone: data?.user?.phone,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [passwordData, setPasswordData] = useState({
    password: "",
    re_password: "",
  });

  const t = useTranslations("Dashboard.admin.settings.account-settings-form");

  const handleChangeAccountData = (e) => {
    const { name, value } = e.target;
    setUpdatedAccountSettings((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangePasswordData = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    handleChangeAccountData(event);
  };

  const handleAccountSettingsSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin/update/account/details", {
      method: "POST",
      body: JSON.stringify(updatedAccountSettings),
    });

    if (response.ok) {
      const body = await response.json();

      if (body.response === true) {
        toast.success(t("change-details-success"), {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        await update({
          f_name: body.body?.f_name,
          l_name: body.body?.l_name,
          email: body.body?.email,
          phone: body.body?.phone,
        });
      } else {
        toast.error(t("change-details-fail"), {
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
      toast.error(t("change-details-fail"), {
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

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordsMatch) {
      const response = await fetch("/api/admin/update/account/password", {
        method: "POST",
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        const body = await response.json();

        if (body.response) {
          toast.success(t("change-password-success"), {
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
          toast.error(t("change-password-fail"), {
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
        toast.error(t("change-password-fail"), {
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
    {
      toast.error(t("change-password-no-match"), {
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

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const handleNewPasswordVisibleClick = (e) => {
    e.preventDefault();
    setNewPasswordVisible(!newPasswordVisible);
  };

  useEffect(() => {
    setUpdatedAccountSettings({
      id: data?.user?.id,
      f_name: data?.user?.f_name,
      l_name: data?.user?.l_name,
      email: data?.user?.email,
      phone: data?.user?.phone,
    });
  }, [data]);

  useEffect(() => {
    if (
      passwordData?.password.toString() === passwordData?.re_password.toString()
    ) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [passwordData?.password, passwordData?.re_password]);

  return (
    <>
      <h2 className="text-xl font-bold">{t("account-settings-title")}</h2>

      <div className="w-full flex flex-row gap-12">
        {data?.user ? (
          <>
            <form onSubmit={handleAccountSettingsSubmit} className="w-1/2">
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("fname-label")}
                </label>
                <input
                  placeholder={t("fname-ph")}
                  type="text"
                  name="f_name"
                  onChange={handleChangeAccountData}
                  value={updatedAccountSettings?.f_name}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("lname-label")}
                </label>
                <input
                  placeholder={t("lname-ph")}
                  type="text"
                  name="l_name"
                  onChange={handleChangeAccountData}
                  value={updatedAccountSettings?.l_name}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("email-label")}
                </label>
                <input
                  placeholder={t("email-ph")}
                  type="email"
                  name="email"
                  onChange={handleChangeAccountData}
                  value={updatedAccountSettings?.email}
                  className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
                  required
                />
              </div>
              <div className="w-full flex flex-col mb-2 max-md:w-full">
                <label className="px-1 text-foregroundPrimary70">
                  {t("phone-label")}
                </label>
                <PhoneInput
                  value={updatedAccountSettings?.phone}
                  placeholder={t("phone-ph")}
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
              >
                {t("submit-btn")}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="w-1/2">
              <LoadingBlock />
            </div>
          </>
        )}
        <form onSubmit={handleChangePasswordSubmit} className="w-1/2">
          <div className="w-full flex flex-col mb-2">
            <label className="px-1 text-foregroundPrimary70">
              {t("password-label")}
            </label>
            <div className="relative flex flex-row items-center content-center">
              <input
                placeholder={t("password-ph")}
                type={newPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChangePasswordData}
                value={passwordData?.password}
                className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ${
                  passwordsMatch ? "" : "border-dashboardRed70"
                }`}
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
              {t("re-password-label")}
            </label>
            <div className="relative flex flex-row items-center content-center">
              <input
                placeholder={t("re-password-ph")}
                type={newPasswordVisible ? "text" : "password"}
                name="re_password"
                onChange={handleChangePasswordData}
                value={passwordData?.re_password}
                className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 ${
                  passwordsMatch ? "" : "border-dashboardRed70"
                }`}
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
          {passwordsMatch ? (
            <>
              <button
                type="submit"
                className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
                disabled={!passwordsMatch}
              >
                {t("submit-password-btn")}
              </button>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-dashboardRed text-center">
                {t("password-no-match")}
              </p>
            </>
          )}
        </form>
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
    </>
  );
}

export default AdminAccountSettings;
