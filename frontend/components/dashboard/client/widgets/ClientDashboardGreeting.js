"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

function ClientDashboardGreeting() {
  const session = useSession();

  const t = useTranslations("Dashboard.client");

  useEffect(() => {
    // if (session?.data?.user && dataIsLoading) {
    //   getClientLastOrders(session?.data?.user?.id);
    // }

    console.log("greetings session - ", session);
  }, [session]);
  return (
    <div>
      <h2 className="text-xl mb-8">
        {t("dashboard-greetings")} {session?.data?.user?.f_name}
      </h2>
    </div>
  );
}

export default ClientDashboardGreeting;
