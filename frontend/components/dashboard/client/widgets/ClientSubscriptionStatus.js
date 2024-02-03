"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

function ClientSubscriptionStatus({ locale }) {
  const session = useSession();

  const [dataIsLoading, setDataIsLoading] = useState(true);

  const [data, setData] = useState(null);
  const t = useTranslations("Dashboard.client");

  return (
    <>
      <div className="w-full border-foregroundPrimary10 border-[1px] rounded-xl shadow-xl py-6 px-8 bg-backgroundPrimary">
        <h3 className="text-2xl font-bold mb-4">
          {t("subscription-status.title")}
        </h3>
        {data === null ? (
          <>
            <p className="text-xl mb-4">
              {t("subscription-status.status")} -{" "}
              <span className="text-dashboardRed font-bold">
                {t("subscription-status.inactive")}
              </span>
            </p>

            <Link
              href="/dashboard/client/subscription"
              locale={locale}
              className="
              block  bg-gradient-to-r w-full from-gradientGreen via-gradientPurple to-gradientGreen bg-[length:200%] bg-left hover:bg-right duration-500 ease transition-all text-center text-2xl text-backgroundPrimary rounded-2xl py-3
            "
            >
              {t("subscription-status.want-subscription")}
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ClientSubscriptionStatus;
