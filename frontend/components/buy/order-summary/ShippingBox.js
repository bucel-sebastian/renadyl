"use client";
import Link from "next-intl/link";
import React, { Suspense, useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LoadingBlock from "@/components/LoadingBlock";

function ShippingBox() {
  const { shipping } = useSelector((state) => state.cart.checkoutData);

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

  const t = useTranslations("Order-summary");
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
        }
      }
  }, [savedShippingDatas]);
  console.log(shipping);
  return (
    <>
      <div className="relative flex flex-col justify-between gap-4 h-4/5">
        <div>
          <Suspense
            fallback={
              <>
                <LoadingBlock />
              </>
            }
          >
            {shipping.savedData === null ? (
              <>
                <h3 className="text-center">
                  {shipping.type === "courier" ? (
                    <>{t("delivery-courier")}</>
                  ) : (
                    <>{t("delivery-easybox")}</>
                  )}
                </h3>
                {shipping.type === "courier" ? (
                  <>
                    <p className="text-center">
                      {shipping.address}, {shipping.postalCode}, {shipping.city}
                      , {shipping.state}, {shipping.country}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-center">
                      {shipping.locker.name}, {shipping.locker.address},{" "}
                      {shipping.locker.city}, {shipping.locker.county}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <h3 className="text-center">
                  <>{t("delivery-courier")}</>
                </h3>
                <p className="text-center">
                  {selectedShippingData?.address},{" "}
                  {selectedShippingData?.postal_code},{" "}
                  {selectedShippingData?.city}, {selectedShippingData?.state},{" "}
                  {selectedShippingData?.country}
                </p>
              </>
            )}
          </Suspense>
        </div>
        <Link
          href="/checkout#shipping"
          className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
        >
          <FaPencil className="text-sm mb-[1px]" />
          {t("modify-btn")}
        </Link>
      </div>
    </>
  );
}

export default ShippingBox;
