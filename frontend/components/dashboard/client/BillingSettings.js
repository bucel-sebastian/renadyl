"use client";

import React, { useEffect, useState } from "react";
import SavedBillingDetails from "./SavedBillingDetails";
import NewBillingDetails from "./NewBillingDetails";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LoadingBlock from "@/components/LoadingBlock";

function BillingSettings() {
  const [showNewDatas, setShowNewDatas] = useState(false);
  const [savedBillingDatas, setSavedBillingDatas] = useState([]);
  const [savedBillingDatasFetched, setSavedBillingDatasFetched] =
    useState(false);

  const t = useTranslations("Dashboard.client.settings");

  const getBillingDatas = async () => {
    setShowNewDatas(false);
    const session = await getSession();
    console.log("Session - ", session);
    const response = await fetch(
      `/api/client/data/json/get-billing-datas/${session.user.id}`
    );
    const body = await response.json();
    setSavedBillingDatas(body.body);
    setSavedBillingDatasFetched(true);
  };

  useEffect(() => {
    getBillingDatas();
  }, []);

  return (
    <>
      <button
        onClick={() => setShowNewDatas(!showNewDatas)}
        className={`block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-[background] text-center text-2xl text-backgroundPrimary rounded-2xl mb-2 ${
          showNewDatas ? "p-3" : "p-1"
        }`}
      >
        {showNewDatas ? (
          <>{t("new-billing-data-btn")}</>
        ) : (
          <>
            <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
              {t("new-billing-data-btn")}
            </div>
          </>
        )}
      </button>

      {showNewDatas ? (
        <>
          <NewBillingDetails getUpdatedData={getBillingDatas} />
        </>
      ) : (
        <></>
      )}

      {savedBillingDatasFetched ? (
        <>
          <SavedBillingDetails
            savedBillingDatas={savedBillingDatas}
            savedBillingDatasFetched={savedBillingDatasFetched}
            getUpdatedData={getBillingDatas}
            showNewDatas={showNewDatas}
          />
        </>
      ) : (
        <>
          <LoadingBlock />
        </>
      )}
    </>
  );
}

export default BillingSettings;
