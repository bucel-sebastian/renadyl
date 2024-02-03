"use client";
import LoadingBlock from "@/components/LoadingBlock";
import { useTranslations } from "next-intl";
import React, { Suspense, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function ClientsPie() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const t = useTranslations("Dashboard");

  const [data, setData] = useState([]);


  const getClientsPieChartData = async () => {
    const response = await fetch("/api/admin/data/json/clients-pie-chart");
    if (response.ok) {
      const body = await response.json();

      setData([
        { title: "logati", value: parseInt(body.body.loggedInClients) },
        { title: "anonimi", value: parseInt(body.body.anonymousClients) },
      ]);
      setDataIsLoading(false);
    }
  };

  useEffect(() => {
    getClientsPieChartData();
  }, []);

  useEffect(() => {
    console.log("chart pie", data);
  }, [data]);

  return (
    <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
      <h3 className="text-2xl font-bold">
        {t("admin.analytics.clients-pie.title")}
      </h3>
      {dataIsLoading ? (
        <>
          <LoadingBlock />
        </>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width="100%" height={250}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#197BBD"
                label
              />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default ClientsPie;
