"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { persistor } from "@/redux/store";
import RedirectToPayment from "../RedirectToPayment";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function OrderSummaryBox({ locale }) {
  const router = useRouter();

  const t = useTranslations("Order-summary");

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    router.replace("/cart", { locale: locale });
  }

  const slice = useSelector((state) => state);

  const [shopIsOn, setShopIsOn] = useState(true);

  const [havePaymentData, setHavePaymentData] = useState(false);
  const [netopiaEnvKey, setNetopiaEnvKey] = useState(null);
  const [netopiaData, setNetopiaData] = useState(null);
  const [netopiaCipher, setNetopiaCipher] = useState(null);
  const [netopiaIv, setNetopiaIv] = useState(null);

  const [summaryData, setSummaryData] = useState({
    orderTotal: 0,
    productsTotal: 0,
    productsSaleTotal: 0,
    promoTotal: 0,
    shippingTotal: 0,
    vatProcent: 0,
    vatTotal: 0,
  });

  const handleFormSubmit = async () => {
    const session = await getSession();

    const requestBody = {
      cart: cart,
      checkoutData: checkoutData,
      summaryData: summaryData,
      userData: session,
      locale: locale,
    };

    const response = await fetch("/api/place-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson);
      const body = await responseJson.body;

      if (body.paymentType === "cash") {
        persistor.purge();
        router.push(`/order-placed?orderId=${body.databaseResponse[0].id}`, {
          locale: locale,
        });
      } else {
        const { env_key, data, cipher, iv } = await body.paymentData;

        if (env_key !== null && data !== null) {
          setNetopiaEnvKey(env_key);
          setNetopiaData(data);
          setNetopiaCipher(cipher);
          setNetopiaIv(iv);
          setHavePaymentData(true);
        }
      }
    }
  };

  const calculateCartSummary = async () => {
    const requestBody = {
      cart: cart,
      checkoutData: checkoutData,
    };

    const response = await fetch(
      "/api/data/json/checkout/calculate-order-total",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();

    setSummaryData(data.body);
  };

  useEffect(() => {
    calculateCartSummary();
  }, [cart, checkoutData]);

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
  }, []);

  const checkOrderData = async () => {
    console.log("Checkout data", checkoutData);
    let redirectToCart = false;
    if (checkoutData?.payment === "null") {
      redirectToCart = true;
    }
    if (checkoutData?.shipping?.savedData === null) {
      if (checkoutData?.shipping?.type === "easybox") {
        if (
          checkoutData?.shipping?.locker === null ||
          checkoutData?.shipping?.locker === ""
        ) {
          redirectToCart = true;
        }
      } else {
        if (
          checkoutData?.shipping?.address === "" ||
          checkoutData?.shipping?.city === "" ||
          checkoutData?.shipping?.country === "" ||
          checkoutData?.shipping?.email === "" ||
          checkoutData?.shipping?.fname === "" ||
          checkoutData?.shipping?.lname === "" ||
          checkoutData?.shipping?.state === ""
        ) {
          redirectToCart = true;
        }
      }
    }
    if (checkoutData?.billing?.savedData === null) {
      if (checkoutData?.billing?.asShipping === false) {
        if (checkoutData?.billing?.entity === "") {
          redirectToCart = true;
        } else {
          if (checkoutData?.billing?.entity === "pf") {
            if (
              checkoutData?.billing?.address === "" ||
              checkoutData?.billing?.city === "" ||
              checkoutData?.billing?.country === "" ||
              checkoutData?.billing?.email === "" ||
              checkoutData?.billing?.fname === "" ||
              checkoutData?.billing?.lname === "" ||
              checkoutData?.billing?.state === ""
            ) {
              redirectToCart = true;
            }
          } else {
            if (
              checkoutData?.billing?.address === "" ||
              checkoutData?.billing?.city === "" ||
              checkoutData?.billing?.country === "" ||
              checkoutData?.billing?.email === "" ||
              checkoutData?.billing?.companyName === "" ||
              checkoutData?.billing?.companyCif === "" ||
              checkoutData?.billing?.state === ""
            ) {
              redirectToCart = true;
            }
          }
        }
      }
    }
    if (checkoutData?.currency === "") {
      redirectToCart = true;
    }

    if (redirectToCart === true) {
      router.replace("/cart", { locale: locale });
    }
  };

  useEffect(() => {
    checkOrderData();
  }, []);

  return (
    <div>
      <div className="flex flex-row mb-4 pb-2 border-b-[1px] border-b-foregroundPrimary20">
        <div className="w-1/2 flex items-end">
          <table className="w-full">
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.productName === "renal_single"
                      ? t("renal-single-short-name")
                      : t("renal-bundle-short-name")}
                  </td>
                  <td>
                    {item.quantity} {t("product-unit")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <p className="text-right">
            {t("total-products")}: {summaryData.productsTotal}{" "}
            {checkoutData.currency}
          </p>
          {summaryData.promoTotal === 0 ? (
            <></>
          ) : (
            <>
              <p className="text-right">
                {t("total-promocode")}: -{summaryData.promoTotal}{" "}
                {checkoutData.currency}
              </p>
            </>
          )}

          <p className="text-right">
            {t("total-shipping")}: {summaryData.shippingTotal}{" "}
            {checkoutData.currency}
          </p>
          <h2 className="text-right text-2xl font-bold">
            {t("total-order")}: {summaryData.orderTotal} {checkoutData.currency}
          </h2>
        </div>
      </div>
      {shopIsOn === true ? (
        <>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
          >
            {t("place-order")}
          </button>
        </>
      ) : (
        <>
          <div className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl rounded-2xl p-1 cursor-pointer">
            <div className="bg-backgroundPrimary rounded-xl text-foregroundPrimary h-full flex justify-center items-center content-center py-2">
              {t("buy-button-shop-off")}
            </div>
          </div>
        </>
      )}

      {havePaymentData ? (
        <>
          <RedirectToPayment
            netopiaEnvKey={netopiaEnvKey}
            netopiaData={netopiaData}
            netopiaCipher={netopiaCipher}
            netopiaIv={netopiaIv}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderSummaryBox;
