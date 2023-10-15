"use client";

import { useTranslations } from "next-intl";
import LinkWithRef from "next-intl/link";
import Image from "next/image";
import Link from "next-intl/link";

import renadylLogoWhite from "@/public/renadyl_logo_white.svg";
import { useState } from "react";

import roLocaleIcon from "@/public/images/ro-icon.svg";
import enLocaleIcon from "@/public/images/en-icon.svg";
import deLocaleIcon from "@/public/images/de-icon.svg";
import { FaUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next-intl/client";

function LoginHeader({ currentLocale }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/login";

  const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);

  const t = useTranslations("Header");

  const locales = { ro: roLocaleIcon, en: enLocaleIcon, de: deLocaleIcon };

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

  return (
    <header className="fixed block top-0 left-0 w-full h-[75px] z-10 text-backgroundPrimary transition-all duration-300 ">
      <div className="relative flex max-w-[1200px] mx-auto justify-between items-center content-center h-full py-2 max-md:px-5 max-[1200px]:px-4">
        <div className="h-full w-1/2 relative">
          <Link href="/" locale={currentLocale}>
            <Image
              src={renadylLogoWhite}
              alt="Renadyl"
              priority={true}
              className="h-full w-max transition-all duration-300"
            />
          </Link>
        </div>
        <div className="w-1/2 flex row justify-end gap-[6px] max-md:hidden">
          <div>
            {isLogin ? (
              <Link
                href="/register"
                locale={currentLocale}
                className=" h-full border-[2px] border-foregroundPrimary rounded-lg flex items-center content-center px-4"
              >
                {t("register-btn")}
              </Link>
            ) : (
              <Link
                href="/login"
                locale={currentLocale}
                className=" h-full border-[2px] border-foregroundPrimary rounded-lg flex items-center content-center px-4"
              >
                {t("login-btn")}
              </Link>
            )}
          </div>
          <div
            className="relative flex gap-[6px]"
            onMouseOver={openLanguageSwitcher}
            onMouseLeave={closeLanguageSwitcher}
          >
            <Link href="#">
              <Image
                src={locales[currentLocale]}
                alt="Renadyl"
                className={`h-[35px] w-[35px] block rounded-full border-2 transition-all duration-300 border-backgroundPrimary`}
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
                      className={`h-[35px] w-[35px] rounded-full border-2  transition-all duration-300 border-backgroundPrimary`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
