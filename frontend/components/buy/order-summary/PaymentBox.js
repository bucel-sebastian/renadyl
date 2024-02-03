"use client";
import Link from "next-intl/link";
import React, { Suspense, useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function PaymentBox() {
  const { shipping, payment } = useSelector((state) => state.cart.checkoutData);

  const t = useTranslations("Order-summary");

  const [savedShippingDatas, setSavedShippingDatas] = useState([]);
  const [selectedShippingData, setSelectedShippingData] = useState(null);

  const getShippingDatas = async () => {
    const session = await getSession();
    console.log("Session - ", session);
    if (session) {
      const response = await fetch(
        `/api/client/data/json/get-shipping-datas/${session.user.id}`
      );
      const body = await response.json();
      setSavedShippingDatas(body.body);
    }
  };

  useEffect(() => {
    getShippingDatas();
  }, []);

  useEffect(() => {
    if (shipping.savedData !== null)
      for (let i = 0; i < savedShippingDatas.length; i++) {
        if (
          savedShippingDatas[i].id.toString() === shipping.savedData.toString()
        ) {
          setSelectedShippingData(savedShippingDatas[i]);
          console.log(savedShippingDatas[i]);
        }
      }
  }, [savedShippingDatas]);
  console.log(shipping);

  // DE TRADUS
  return (
    <>
      <div className="flex flex-col justify-between gap-4 h-4/5">
        <div></div>
        {shipping?.savedData === null ? (
          <>
            {shipping.type === "courier" && shipping.countryKey === "RO" ? (
              <>
                <p className="text-center">
                  {payment === "card" ? t("payment-card") : t("payment-cash")}
                </p>
                <Link
                  href="/checkout#payment"
                  className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
                >
                  <FaPencil className="text-sm mb-[1px]" />
                  {t("modify-btn")}
                </Link>
              </>
            ) : (
              <>
                <p className="text-center">{t("payment-card")}</p>
                <div></div>
              </>
            )}
          </>
        ) : (
          <>
            {selectedShippingData?.country_key === "RO" ? (
              <>
                <p className="text-center">
                  {payment === "card" ? t("payment-card") : t("payment-cash")}
                </p>
                <Link
                  href="/checkout#payment"
                  className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
                >
                  <FaPencil className="text-sm mb-[1px]" />
                  {t("modify-btn")}
                </Link>
              </>
            ) : (
              <>
                <p className="text-center">{t("payment-card")}</p>
                <div></div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PaymentBox;
