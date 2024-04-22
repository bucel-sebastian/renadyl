"use client";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function ShopOffPopup() {
  const [shopIsOn, setShopIsOn] = useState(true);
  const [showPopupAnimation, setShowPopupAnimation] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const [cookieExists, setCookieExists] = useState(false);

  const t = useTranslations("Shop-off-popup");

  const closeShopOffPopup = async () => {
    setShowPopupAnimation(false);
    Cookies.set("shop-off-notice", "1");
    setTimeout(() => {
      setShowPopup(false);
    }, 350);
  };

  const timeoutRenderPopup = () => {
    setShowPopupAnimation(true);
  };
  const getIfShopIsOn = async () => {
    const response = await fetch("/api/data/json/shop-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    await setShopIsOn(data?.body?.shopStatus === "1" ? false : true);
  };
  useEffect(() => {
    getIfShopIsOn();
    let getCookie = Cookies.get("shop-off-notice");
    if (getCookie) {
      setCookieExists(true);
    } else {
      setCookieExists(false);
    }
  }, []);

  useEffect(() => {
    if (!cookieExists) {
      setShowPopup(true);
      setTimeout(timeoutRenderPopup, 1000);
    } else {
      setShowPopup(false);
    }
  }, [cookieExists]);

  return (
    <>
      {!cookieExists ? (
        <>
          {!shopIsOn ? (
            <>
              {showPopup ? (
                <>
                  <div
                    className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center content-center backdrop-blur-sm ${
                      showPopupAnimation ? "opacity-1" : "opacity-0"
                    } transition-all duration-[0.3s]`}
                  >
                    <div
                      className={`block bg-gradient-to-r max-w-[550px] w-full h-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left rounded-2xl p-1 `}
                    >
                      <div className="bg-backgroundPrimary rounded-xl text-foregroundPrimary h-full flex flex-col py-2 px-2">
                        <h2 className="text-2xl font-bold w-full">
                          {t("title")}
                        </h2>
                        <p className="w-full">{t("text")}</p>
                        <div>
                          <button
                            className="block bg-gradient-to-r w-max from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-lg text-backgroundPrimary rounded-xl py-1 px-4 cursor-pointer flex justify-center items-center content-center mr-0 ml-auto mt-2"
                            onClick={closeShopOffPopup}
                          >
                            {t("close-btn")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <> </>
      )}
    </>
  );
}

export default ShopOffPopup;
