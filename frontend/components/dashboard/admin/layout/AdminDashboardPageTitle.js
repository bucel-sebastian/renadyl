"use client";
import { SessionProvider, useSession } from "next-auth/react";

import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import React from "react";
import renadylLogo from "@/public/renadyl_logo.svg";
import Image from "next/image";
import { useParams } from "next/navigation";

function AdminDashboardPageTitle() {
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
    <div>
      <h1 className="text-3xl font-bold max-lg:ml-2">{pathTranslate}</h1>
    </div>
  );
}

export default AdminDashboardPageTitle;
