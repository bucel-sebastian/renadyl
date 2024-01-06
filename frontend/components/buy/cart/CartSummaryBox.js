"use client";
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveOrderData } from "@/redux/slices/cartSlice";
import { useRouter } from "next-intl/client";
import Link from "next-intl/link";

function CartSummaryBox({ currentLocale }) {
  const router = useRouter();

  const { cart } = useSelector((state) => state.cart);
  const { checkoutData } = useSelector((state) => state.cart);

  console.log(checkoutData);

  const [summaryData, setSummaryData] = useState({
    orderTotal: 0,
    productsTotal: 0,
    productsSaleTotal: 0,
    promoTotal: 0,
    shippingTotal: 0,
    vatProcent: 0,
    vatTotal: 0,
  });

  // const dispatch = useDispatch();
  const t = useTranslations("Cart");
  const calculateCartSummary = async () => {
    const requestBody = {
      cart: cart,
      checkoutData: checkoutData,
    };

    const response = await fetch(
      "/api/data/json/checkout/calculate-total-without-shipping",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    console.log("pre summary data");
    const data = await response.json();
    console.log("Summary data - ", data);
    setSummaryData(data.body);
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    router.push("/checkout", { locale: currentLocale });
  };

  useEffect(() => {
    calculateCartSummary();
  }, [cart, checkoutData]);

  return (
    <>
      <Suspense fallback={<></>}>
        {cart && cart?.length === 0 ? (
          <></>
        ) : (
          <>
            <table className="w-full">
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.productName === "renal_single"
                        ? t("renal-single-short-name")
                        : t("renal-bundle-short-name")}
                    </td>
                    <td align="right">
                      {item.quantity} {t("product-unit")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {summaryData.productsSaleTotal !== 0 ? (
              <>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>{t("total-sale")}</td>
                      <td align="right">
                        {summaryData.productsSaleTotal} {checkoutData.currency}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            <div>
              <p className="text-right">
                {t("total-products")}: {summaryData.productsTotalWithoutVat}{" "}
                {checkoutData.currency}
              </p>
              <p className="text-right">
                {t("total-vat")} {summaryData.vatProcent}%:{" "}
                {summaryData.vatTotal} {checkoutData.currency}
              </p>
              {summaryData.promoTotal !== 0 ? (
                <>
                  <p className="text-right">
                    {t("total-promocode")}: -{summaryData.promoTotal}{" "}
                    {checkoutData.currency}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <h2 className="text-right text-2xl font-bold">
              {t("total-order")}: {summaryData.orderTotal}{" "}
              {checkoutData.currency}
            </h2>
            <div>
              <form onSubmit={handleNextStep}>
                <label className="flex flex-row gap-2 leading-4 items-start">
                  <input type="checkbox" required />
                  <span>
                    {t("tc-label")}{" "}
                    <Link href="/useful/terms-and-conditions">
                      {t("tc-link")}
                    </Link>
                  </span>
                </label>
                <button className="block bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-3xl text-backgroundPrimary rounded-2xl py-3 mt-4">
                  {t("order-next-button")}
                </button>
              </form>
            </div>
          </>
        )}
      </Suspense>
    </>
  );
}

export default CartSummaryBox;
