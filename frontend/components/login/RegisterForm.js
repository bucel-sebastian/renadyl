"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Link from "next/link";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import facebookLogo from "@/public/images/facebook_logo.svg";
import googleLogo from "@/public/images/google_logo.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next-intl/client";
import LinkWithRef from "next-intl/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";

function RegisterForm({ locale }) {
  const t = useTranslations("Register");
  const router = useRouter();

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

      console.log(data);

      if (data.body.status === "ok") {
        router.push(`/register/success`);
        router.refresh();
      } else {
        if (data.body.error === "error-2") {
          toast.error(t("email-exists"), {
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
        if (data.body.error === "error-1") {
          toast.error(t("passwords-no-match"), {
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
        if (data.body.error === "error-3") {
          toast.error(t("other-error"), {
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
    } else {
      toast.error(t("passwords-no-match"), {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //   console.log("parolele nu e la fel");
    }
  };

  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    signIn("google");
  };
  const handleFacebookLogin = async (event) => {
    event.preventDefault();
    signIn("facebook");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="min-w-[350px] max-w-[400px] mt-6"
      >
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
        <div className="flex flex-row items-start content-start gap-3  mb-4">
          <input
            type="checkbox"
            name="tc"
            id="login-remember-me"
            className="mt-1"
          />
          <label htmlFor="login-remember-me">
            {t("register-form.tc-label-1")}
            <Link href="/useful/terms-and-conditions" locale={locale}>
              {t("register-form.tc-link-tc")}
            </Link>
            {t("register-form.tc-label-2")}
            <Link href="/useful/privacy-policy" locale={locale}>
              {t("register-form.tc-link-privacy")}
            </Link>
            {t("register-form.tc-label-3")}
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
          <button
            className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md p-[4px]"
            onClick={handleFacebookLogin}
          >
            <Image src={facebookLogo} />
          </button>

          <button
            className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md p-[4px]"
            onClick={handleGoogleLogin}
          >
            <Image src={googleLogo} />
          </button>
        </div>
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

export default RegisterForm;
