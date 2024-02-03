"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function ClientDashboardGreeting() {
  const session = useSession();
  const [sessionData, setSessionData] = useState({});

  const t = useTranslations("Dashboard.client");

  useEffect(() => {
    // if (session?.data?.user && dataIsLoading) {
    //   getClientLastOrders(session?.data?.user?.id);
    // }

    if (typeof session?.data?.value === "string") {
      setSessionData(JSON.parse(session.data.value));
    } else {
      setSessionData(session.data.value);
    }
  }, [session]);
  return (
    <div>
      <h2 className="text-xl mb-6 max-lg:mb-4">
        {t("dashboard-greetings")} {sessionData?.user?.f_name}
      </h2>
    </div>
  );
}

export default ClientDashboardGreeting;
