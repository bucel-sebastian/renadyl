"use client";
import { useTranslations } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";

function ChangePassForm({ userId }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordData, setPasswordData] = useState({
    password: "",
    rePassword: "",
    userId: userId,
  });

  const t = useTranslations("Dashboard.client.settings");

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordVisibleClick = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (
      passwordData.password.toString() === passwordData.rePassword.toString()
    ) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [passwordData.password, passwordData.rePassword]);

  const handleSubmitUserPassword = async (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      const response = await fetch("/api/client/add/new-password/", {
        method: "POST",
        body: JSON.stringify(passwordData),
      });
      if (response.ok) {
        const body = await response.json();
        if (body.response) {
          setPasswordData({
            password: "",
            rePassword: "",
            userId: userId,
          });
          toast.success(t("change-user-password-success"), {
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
          toast.error(t("change-user-password-fail"), {
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
        toast.error(t("change-user-password-fail"), {
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
      toast.error(t("password-no-match-fail"), {
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
    <form className="w-1/2 max-xl:w-full" onSubmit={handleSubmitUserPassword}>
      <div className="w-2/3 max-xl:w-full">
        <div className="w-full flex flex-col mb-2">
          <label className="px-1 text-foregroundPrimary70">
            {t("update-data-form.password-label")}
          </label>
          <div className="relative flex flex-row items-center content-center">
            <input
              placeholder={t("update-data-form.password-ph")}
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleChangeUserData}
              value={passwordData?.password}
              className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px]  focus:border-foregroundPrimary py-1 px-1 ${
                passwordsMatch
                  ? "border-foregroundPrimary40"
                  : "border-dashboardRed70"
              } `}
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
            {t("update-data-form.re-password-label")}
          </label>
          <div className="relative flex flex-row items-center content-center">
            <input
              placeholder={t("update-data-form.re-password-ph")}
              type={passwordVisible ? "text" : "password"}
              name="rePassword"
              value={passwordData?.rePassword}
              onChange={handleChangeUserData}
              className={`w-full bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px]  focus:border-foregroundPrimary py-1 px-1 ${
                passwordsMatch
                  ? "border-foregroundPrimary40"
                  : "border-dashboardRed70"
              } `}
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
        {passwordsMatch ? (
          <>
            <button
              type="submit"
              className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
              disabled={!passwordsMatch}
            >
              {t("update-data-form.submit-update-user-password-btn")}
            </button>
          </>
        ) : (
          <>
            <div className="relative w-full mx-auto border-foregroundSecondary20   border-[1px] shadow-lg rounded-xl h-max overflow-hidden ">
              <div className="relative w-full flex flex-row  flex items-center content-center justify-center bg-backgroundPrimary p-1 z-10 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:z-0 before:from-gradientGreen before:to-gradientPurple ">
                <div className="relative z-10 p-4 bg-backgroundPrimary content-['']  rounded-lg w-full h-full ">
                  <h3 className="text-xl text-center">
                    {t("update-data-form.passwords-error")}
                  </h3>
                </div>
              </div>
            </div>
          </>
        )}
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

export default ChangePassForm;
