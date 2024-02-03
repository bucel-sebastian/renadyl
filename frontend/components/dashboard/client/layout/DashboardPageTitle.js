"use client";
import { SessionProvider, useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import React from "react";
import renadylLogo from "@/public/renadyl_logo.svg";
import Image from "next/image";
import { useParams } from "next/navigation";

function DashboardPageTitle() {
  const params = useParams();
  const { id } = params;

  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  let pathTranslate = "";

  if (pathname.startsWith("/dashboard/client/orders/")) {
    pathTranslate = `${t("client.header.order-title")} #${id} `;
  } else {
    pathTranslate = t(`client.header.${pathname}`);
  }
  return (
    <div>
      <h1 className="text-3xl font-bold ">{pathTranslate}</h1>
    </div>
  );
}

export default DashboardPageTitle;
