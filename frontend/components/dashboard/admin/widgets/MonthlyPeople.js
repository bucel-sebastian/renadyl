"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import {
  FaUsers,
  FaTruck,
  FaUserDoctor,
  FaUserAstronaut,
} from "react-icons/fa6";

function MonthlyPeople({ type }) {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [data, setData] = useState({
    allCounter: "0",
  });
  const [widgetSettings, setWidgetSettings] = useState({
    peopleIcon: null,
    peopleTitle: null,
    peopleBg: null,
  });

  const t = useTranslations("Dashboard");

  const getNumOfClients = async () => {
    const response = await fetch("/api/admin/data/json/monthly-people/clients");
    if (response.ok) {
      const body = await response.json();

      console.log(type, body);

      setData({
        allCounter: body.body.countAllClients,
        monthCounter: body.body.countActualMonthClients,
      });
      setDataIsLoading(false);
    }
  };
  const getNumOfDistributors = async () => {
    const response = await fetch(
      "/api/admin/data/json/monthly-people/distributors"
    );
    if (response.ok) {
      const body = await response.json();
      console.log(type, body);
      setData({
        allCounter: body.body.countAllDistributors,
        monthCounter: body.body.countActualMonthDistributors,
      });
      setDataIsLoading(false);
    }
  };
  const getNumOfDoctors = async () => {
    const response = await fetch("/api/admin/data/json/monthly-people/doctors");
    if (response.ok) {
      const body = await response.json();

      console.log(type, body);
      setData({
        allCounter: body.body.countAllDoctors,
        monthCounter: body.body.countActualMonthDoctors,
      });
      setDataIsLoading(false);
    }
  };
  const getNumOfAffiliates = async () => {
    const response = await fetch(
      "/api/admin/data/json/monthly-people/affiliates"
    );
    if (response.ok) {
      const body = await response.json();

      console.log(type, body);
      setData({
        allCounter: body.body.countAllAffiliates,
        monthCounter: body.body.countActualMonthAffiliates,
      });
    }
    setDataIsLoading(false);
  };

  useEffect(() => {
    if (dataIsLoading) {
      switch (type) {
        case "client":
          setWidgetSettings({
            peopleIcon: <FaUsers />,
            peopleBg: "gradientPurple",
            peopleTitle: t("admin.analytics.monthly-people.clients"),
          });

          getNumOfClients();
          break;
        case "distributor":
          setWidgetSettings({
            peopleIcon: <FaTruck />,
            peopleBg: "gradientPurple",
            peopleTitle: t("admin.analytics.monthly-people.distributors"),
          });

          getNumOfDistributors();
          break;
        case "medic":
          setWidgetSettings({
            peopleIcon: <FaUserDoctor />,
            peopleBg: "gradientPurple",
            peopleTitle: t("admin.analytics.monthly-people.medics"),
          });
          getNumOfDoctors();
          break;
        case "affiliate":
          setWidgetSettings({
            peopleIcon: <FaUserAstronaut />,
            peopleBg: "gradientPurple",
            peopleTitle: t("admin.analytics.monthly-people.affiliates"),
          });

          getNumOfAffiliates();
          break;
      }
    }
  }, []);

  return (
    <>
      {dataIsLoading ? (
        <>
          <div className="relative w-[48%] h-[100px] overflow-hidden flex justify-center content-center items-center">
            <LoadingBlock />
          </div>
        </>
      ) : (
        <>
          <div
            className={`relative w-[48%] border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl flex flex-row gap-4 content-center items-center p-4 text-backgroundPrimary bg-${widgetSettings.peopleBg}`}
          >
            <div className="text-5xl">{widgetSettings.peopleIcon}</div>
            <div>
              <h3 className="text-2xl font-bold">
                {data?.allCounter} {widgetSettings.peopleTitle}
              </h3>
              {data?.monthCounter && data?.monthCounter !== "0" ? (
                <>
                  <span className="text-lg">+ {data?.monthCounter}</span>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MonthlyPeople;
