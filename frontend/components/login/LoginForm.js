"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter, usePathname } from "next-intl/client";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import facebookLogo from "@/public/images/facebook_logo.svg";
import googleLogo from "@/public/images/google_logo.svg";
import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const router = useRouter();
  const t = useTranslations("Login");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibleClick = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await signIn("clientCredentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      rememberMe: formData.get("remember-me"),
      redirect: false,
    });
    console.log(response);

    if (!response?.error) {
      const session = await getSession();
      console.log(await session.user);
      if (session?.user?.role !== "admin") {
        router.push(`/dashboard/${session.user.role}`);
        router.refresh();
      }
    } else {
      if (response.error === "not activated") {
        toast.error(t("error-not-activated"), {
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
        toast.error(t("error"), {
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
      <form onSubmit={handleSubmit} className="min-w-[400px] mt-6">
        <div className="w-full flex flex-col mb-2">
          <label className="px-1 text-foregroundPrimary70">
            {t("login-form.email-label")}
          </label>
          <input
            placeholder={t("login-form.email-ph")}
            type="email"
            name="email"
            className="bg-backgroundPrimary duration-300 transition-all outline-none border-b-[1px] border-foregroundPrimary40 focus:border-foregroundPrimary py-1 px-1 "
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
          <Link href="/lost-password">
            {t("login-form.password-forgot-link")}
          </Link>
        </div>
        <div className="flex flex-row items-center content-center gap-3  mb-2">
          <input type="checkbox" name="remember-me" id="login-remember-me" />
          <label htmlFor="login-remember-me">
            {t("login-form.remember-label")}
          </label>
        </div>
        <button
          type="submit"
          className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-2 mx-auto"
        >
          {t("login-form.submit-btn")}
        </button>
        {/* <div className="flex flex-col items-center content-center gap-1 mt-2 mb-4">
                    <Link href="/register" >
                        {t("login-form.register-link")}
                    </Link>
                    
                </div> */}
      </form>
      <div className="mt-4">
        <p className="text-center">{t("login-form.other-options")}</p>
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

          {/* <button className="w-[40px] h-[40px] bg-foregroundSecondary10 rounded-md"></button> */}
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

export default LoginForm;
