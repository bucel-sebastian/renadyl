"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RedirectToPayment from "../RedirectToPayment";

function OrderSummaryBox() {
  const t = useTranslations("Order-summary");

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);
  const slice = useSelector((state) => state);

  const [havePaymentData, setHavePaymentData] = useState(false);
  const [netopiaEnvKey, setNetopiaEnvKey] = useState(null);
  const [netopiaData, setNetopiaData] = useState(null);

  console.log("CART - ", cart);
  console.log("SLICE - ", slice);

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
    const requestBody = {
      cart: cart,
      checkoutData: checkoutData,
      summaryData: summaryData,
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

      const { env_key, data } = await body.paymentData;

      if (env_key !== null && data !== null) {
        setNetopiaEnvKey(env_key);
        setNetopiaData(data);
        setHavePaymentData(true);
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

    console.log("SUMMARY ", data.body);
    setSummaryData(data.body);
  };

  useEffect(() => {
    calculateCartSummary();
  }, [cart, checkoutData]);

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
      <button
        type="submit"
        onClick={handleFormSubmit}
        disabled
        className="block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3"
      >
        {t("place-order")}
      </button>

      {havePaymentData ? (
        <>
          <RedirectToPayment
            netopiaEnvKey={netopiaEnvKey}
            netopiaData={netopiaData}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderSummaryBox;
