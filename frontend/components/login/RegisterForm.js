"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Link from "next/link";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const t = useTranslations("Register");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibleClick = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataJson = new Object();

    for (let entry of formData) {
      formDataJson[entry[0]] = entry[1];
    }

    console.log(formDataJson);
    if (formDataJson["password"] === formDataJson["re_password"]) {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formDataJson),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(await response.json());
      const data = await response.json();

      if (data.body.status === "ok") {
      } else {
      }
    } else {
      //   console.log("parolele nu e la fel");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="min-w-[400px] mt-6">
        <div className="w-full flex flex-col mb-2">
          <label className="px-1 text-foregroundPrimary70">
            {t("register-form.fname-label")}
          </label>
          <input
            placeholder={t("register-form.fname-ph")}
            type="text"
            name="f_name"
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
            name="l_name"
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
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
            name="email"
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
            required
          />
        </div>
        <div className="w-full flex flex-col mb-2">
          <label className="px-1 text-foregroundPrimary70">
            {t("register-form.password-label")}
          </label>
          <div className="relative flex flex-row items-center content-center">
            <input
              placeholder={t("register-form.password-ph")}
              type={passwordVisible ? "text" : "password"}
              name="password"
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
              name="re_password"
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
        <div className="flex flex-row items-center content-center gap-3  mb-4">
          <input type="checkbox" name="tc" id="login-remember-me" />
          <label htmlFor="login-remember-me">
            {t("register-form.tc-label")}
          </label>
        </div>
        <button
          type="submit"
          className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
        >
          {t("register-form.submit-btn")}
        </button>
        {/* <div className="flex flex-col items-center content-center gap-1 mt-2 mb-4">
                    <Link href="/login" >
                        {t("register-form.login-link")}
                    </Link>
                    
                </div> */}
      </form>
      <div>
        <p className="text-center">{t("register-form.other-options")}</p>
        <div className="flex flex-row gap-5 justify-center mt-2">
          <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>

          <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>

          <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
