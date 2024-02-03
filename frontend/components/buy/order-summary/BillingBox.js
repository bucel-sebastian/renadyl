"use client";
import React, { useEffect, useState } from "react";
import Link from "next-intl/link";

import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function BillingBox() {
  const { billing, shipping } = useSelector((state) => state.cart.checkoutData);
  console.log(billing);

  const t = useTranslations("Order-summary");

  const [savedBillingDatas, setSavedBillingDatas] = useState([]);
  const [selectedBillingData, setSelectedBillingData] = useState(null);

  const getBillingDatas = async () => {
    const session = await getSession();
    if (session) {
      const response = await fetch(
        `/api/client/data/json/get-billing-datas/${session.user.id}`
      );
      const body = await response.json();
      setSavedBillingDatas(body.body);
    }
  };

  useEffect(() => {
    getBillingDatas();
  }, []);
  useEffect(() => {
    if (billing.savedData !== null)
      for (let i = 0; i < savedBillingDatas.length; i++) {
        if (
          savedBillingDatas[i].id.toString() === billing.savedData.toString()
        ) {
          setSelectedBillingData(savedBillingDatas[i]);
        }
      }
  }, [savedBillingDatas]);
  return (
    <>
      <div className="flex flex-col justify-between gap-4 h-4/5">
        <div>
          {billing.savedData === null ? (
            <>
              {billing.asShipping === true ? (
                <>
                  <h3 className="text-center">{t("entity-pf")}</h3>
                  {shipping.type === "courier" ? (
                    <>
                      <p className="text-center">
                        {shipping.address}, {shipping.postalCode},{" "}
                        {shipping.city}, {shipping.state}, {shipping.country}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-center">
                        {shipping.locker.city}, {shipping.locker.county},{" "}
                        {shipping.country}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  {billing.entity === "pf" ? (
                    <>
                      <h3 className="text-center">{t("entity-pf")}</h3>
                      <p className="text-center">
                        {billing.fname} {billing.lname}
                      </p>
                      <p className="text-center">
                        {billing.address}, {billing.postalCode}, {billing.city},{" "}
                        {billing.state}, {billing.country}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-center">{t("entity-pj")}</h3>
                      <p className="text-center">
                        {billing.companyName} {billing.companyCif}
                      </p>
                      <p className="text-center">
                        {billing.address}, {billing.postalCode}, {billing.city},{" "}
                        {billing.state}, {billing.country}
                      </p>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {selectedBillingData?.entity === "pf" ? (
                <>
                  <h3 className="text-center">{t("entity-pf")}</h3>
                  <p className="text-center">
                    {selectedBillingData?.f_name} {selectedBillingData?.l_name}
                  </p>
                  <p className="text-center">
                    {selectedBillingData?.address},{" "}
                    {selectedBillingData?.postal_code},{" "}
                    {selectedBillingData?.city}, {selectedBillingData?.state},{" "}
                    {selectedBillingData?.country}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-center">{t("entity-pj")}</h3>
                  <p className="text-center">
                    {selectedBillingData?.company_name}{" "}
                    {selectedBillingData?.company_cif}
                  </p>
                  <p className="text-center">
                    {selectedBillingData?.address},{" "}
                    {selectedBillingData?.postal_code},{" "}
                    {selectedBillingData?.city}, {selectedBillingData?.state},{" "}
                    {selectedBillingData?.country}
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <Link
          href="/checkout#billing"
          className="block relative w-max mx-auto flex flex-row gap-2 items-center border-[2px] border-foregroundPrimary20 px-4 rounded-full"
        >
          <FaPencil className="text-sm mb-[1px]" />
          {t("modify-btn")}
        </Link>
      </div>
    </>
  );
}

export default BillingBox;
