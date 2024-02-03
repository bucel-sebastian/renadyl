"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import UserNav from "../widgets/UserNav";

function Header({ currentLocale, session }) {
  const params = useParams();
  const { id } = params;

  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  let pathTranslate = "";

  if (pathname.startsWith("/admin/dashboard/orders/")) {
    pathTranslate = `${t("admin.header.order-title")} #${id} `;
  } else if (pathname.startsWith("/admin/dashboard/medics/")) {
    pathTranslate = `${t("admin.header.medic-title")} `;
  } else if (pathname.startsWith("/admin/dashboard/clients/")) {
    pathTranslate = `${t("admin.header.client-title")} #${id} `;
  } else if (pathname.startsWith("/admin/dashboard/distributors/")) {
    pathTranslate = `${t("admin.header.distributor-title")} #${id} `;
  } else if (pathname.startsWith("/admin/dashboard/affiliates/")) {
    pathTranslate = `${t("admin.header.affiliate-title")} #${id} `;
  } else {
    pathTranslate = t(`admin.header.${pathname}`);
  }

  return (
    <>
      <div className="h-[75px] flex flex-row items-center content-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{pathTranslate}</h1>
        </div>
        <div>
          <SessionProviderInClient session={session}>
            <UserNav />
          </SessionProviderInClient>
        </div>
      </div>
    </>
  );
}

export default Header;
