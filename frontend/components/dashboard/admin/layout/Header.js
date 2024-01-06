"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import UserNav from "../widgets/UserNav";

function Header({ currentLocale }) {
  const params = useParams();
  const { id } = params;

  const t = useTranslations("Dashboard");
  const pathname = usePathname();
  let pathTranslate = "";

  if (pathname.startsWith("/admin/dashboard/orders/")) {
    pathTranslate = `${t("admin.header.order-title")} #${id} `;
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
          <SessionProvider>
            <UserNav />
          </SessionProvider>
        </div>
      </div>
    </>
  );
}

export default Header;
