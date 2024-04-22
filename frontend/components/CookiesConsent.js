"use client";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function CookiesConsent({ locale }) {
  const [showPopup, setShowPopup] = useState(true);
  const [showPopupAnimation, setShowPopupAnimation] = useState(false);

  const [cookieExists, setCookieExists] = useState(false);
  const t = useTranslations("Cookies-consent");
  const closeGdprPopup = () => {
    setShowPopupAnimation(false);
    Cookies.set("cookies-consent", "1", { expires: 7 });
    setTimeout(() => {
      setShowPopup(false);
    }, 350);
  };

  const timeoutRenderPopup = () => {
    setShowPopupAnimation(true);
  };

  useEffect(() => {
    let getCookie = Cookies.get("cookies-consent");
    if (getCookie) {
      setCookieExists(true);
    } else {
      setCookieExists(false);
    }
  }, []);

  useEffect(() => {
    if (!cookieExists) {
      setShowPopup(true);
      setTimeout(timeoutRenderPopup, 1500);
    } else {
      setShowPopup(false);
    }
  }, [cookieExists]);

  return (
    <>
      {!cookieExists ? (
        <>
          {showPopup ? (
            <>
              <div
                className={`block bg-gradient-to-r max-w-[550px] w-full h-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left rounded-2xl p-1 fixed bottom-2 left-2 ${
                  showPopupAnimation ? "opacity-1" : "opacity-0"
                } transition-all duration-[0.3s]`}
              >
                <div className="bg-backgroundPrimary rounded-xl text-foregroundPrimary h-full flex flex-col py-2 px-2">
                  <h2 className="text-2xl font-bold w-full">{t("title")}</h2>
                  <p className="w-full">{t("text")}</p>
                  <div>
                    <button
                      className="block bg-gradient-to-r w-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-lg text-backgroundPrimary rounded-xl py-1 px-4 cursor-pointer flex justify-center items-center content-center mr-0 ml-auto mt-2"
                      onClick={closeGdprPopup}
                    >
                      {t("close-btn")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <> </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default CookiesConsent;
