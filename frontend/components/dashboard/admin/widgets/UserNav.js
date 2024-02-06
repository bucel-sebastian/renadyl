"use client";
import { getSession, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/client";

import React, { useEffect, useState } from "react";

import roLocaleIcon from "@/public/images/ro-icon.svg";
import enLocaleIcon from "@/public/images/en-icon.svg";
import deLocaleIcon from "@/public/images/de-icon.svg";

import Image from "next/image";
import Link from "next-intl/link";

function UserNav({ currentLocale }) {
  const session = useSession();

  const pathname = usePathname();

  const router = useRouter();

  const [sessionData, setSessionData] = useState({});
  const [fnameInitial, setFnameInitial] = useState("");

  const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);

  const locales = {
    ro: roLocaleIcon,
    en: enLocaleIcon,
    // de: deLocaleIcon
  };

  const filteredLocales = [];
  for (const key in locales) {
    if (key !== currentLocale) {
      filteredLocales.push(locales[key]);
    }
  }
  const localesDef = [];
  for (const key in locales) {
    if (key !== currentLocale) {
      localesDef.push(key);
    }
  }

  const allLocalesDef = [];
  for (const key in locales) {
    allLocalesDef.push(key);
  }

  const t = useTranslations("Dashboard");

  const handleSignOut = (e) => {
    e.preventDefault();
    if (sessionData.user.role === "admin") {
      signOut({ callbackUrl: "/admin/login" });
    } else {
      signOut({ callbackUrl: "/login" });
    }
  };

  useEffect(() => {
    console.log(session);
    if (typeof session?.data?.value === "string") {
      setSessionData(JSON.parse(session.data.value));
    } else {
      console.log("nu e string ", session);
      setSessionData(session.data);
    }

    if (session?.status === "unauthenticated") {
      router.replace("/");
    }
  }, [session]);

  useEffect(() => {
    console.log(sessionData?.user);
    setFnameInitial(sessionData?.user?.f_name?.charAt(0));
  }, [sessionData]);

  const openLanguageSwitcher = () => {
    setLanguageSwitcherOpen(true);
  };

  const closeLanguageSwitcher = () => {
    setLanguageSwitcherOpen(false);
  };

  const switchLocale = (locale) => {
    // console.log(pathname,locale);
    router.replace(pathname, { locale: locale });
  };

  useEffect(() => {
    console.log("filtred locales - ", filteredLocales);
  }, [filteredLocales]);
  return (
    <>
      {sessionData?.user ? (
        <>
          <div className="flex flex-row items-center content-center gap-3">
            <div className="w-[35px] flex justify-center align-center items-center aspect-square bg-gradientPurple text-backgroundPrimary font-bold rounded-full text-xl">
              {fnameInitial}
            </div>
            <div className="flex flex-col mr-4">
              <span className="w-full leading-none capitalize">
                {sessionData?.user?.role === "doctor" ? "Dr. " : ""}
                {sessionData?.user.f_name} {sessionData?.user.l_name}
              </span>
              <span className="w-full leading-none capitalize">
                {sessionData?.user?.role}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="block  bg-gradient-to-r  from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-[background] text-center  text-backgroundPrimary rounded-2xl  p-1"
            >
              <div className="w-full py-1 px-4 rounded-xl bg-backgroundPrimary text-center  text-foregroundPrimary font-bold">
                {t("sign-out-btn")}
              </div>
            </button>
            <div
              className="relative flex gap-[6px]"
              onMouseOver={openLanguageSwitcher}
              onMouseLeave={closeLanguageSwitcher}
            >
              <Link href="#">
                <Image
                  src={locales[currentLocale]}
                  alt="Renadyl"
                  className={`h-[35px] w-[35px] block rounded-full border-2 transition-all duration-300 
                      border-foregroundPrimary`}
                />
              </Link>
              <div
                className={`relative block  ${
                  languageSwitcherOpen ? "w-[76px]" : "w-[0px]"
                } overflow-hidden   transition-all duration-500 ease-in-out`}
              >
                <div className="absolute top-0 left-0 flex flex-row gap-[6px] w-content">
                  {filteredLocales.map((value, index) => (
                    <button
                      key={index}
                      className="w-[35px]"
                      onClick={() => switchLocale(localesDef[index])}
                    >
                      <Image
                        src={value}
                        alt="Renadyl"
                        className={`h-[35px] w-[35px] rounded-full border-2  transition-all duration-300 
                          border-foregroundPrimary
                      `}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserNav;
