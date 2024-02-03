"use client";

import React, { useEffect, useState } from "react";
import NewShippginDetails from "./NewShippginDetails";
import SavedShippingDetails from "./SavedShippingDetails";
import { getSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import LoadingBlock from "@/components/LoadingBlock";

function ShippingSettings() {
  const [showNewDatas, setShowNewDatas] = useState(false);
  const [savedShippingDatas, setSavedShippingDatas] = useState([]);
  const [savedShippingDatasFetched, setSavedShippingDatasFetched] =
    useState(false);

  const t = useTranslations("Dashboard.client.settings");

  const getShippingDatas = async () => {
    setShowNewDatas(false);

    const session = await getSession();
    console.log("Session - ", session);
    const response = await fetch(
      `/api/client/data/json/get-shipping-datas/${session.user.id}`
    );
    const body = await response.json();
    setSavedShippingDatas(body.body);
    setSavedShippingDatasFetched(true);
  };

  useEffect(() => {
    getShippingDatas();
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
          <>{t("new-shipping-data-btn")}</>
        ) : (
          <>
            <div className="w-full py-2 rounded-xl bg-backgroundPrimary text-center text-2xl text-foregroundPrimary font-bold">
              {t("new-shipping-data-btn")}
            </div>
          </>
        )}
      </button>

      {showNewDatas ? (
        <>
          <NewShippginDetails getUpdatedData={getShippingDatas} />
        </>
      ) : (
        <></>
      )}

      {savedShippingDatasFetched ? (
        <>
          <SavedShippingDetails
            savedShippingDatas={savedShippingDatas}
            savedShippingDatasFetched={savedShippingDatasFetched}
            getUpdatedData={getShippingDatas}
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

export default ShippingSettings;
